const { Colis, Utilisateur, ColisSuivi } = require('../../../models');
const { Op } = require('sequelize');

class AdminService {

  // STATS COLIS
  static async getColisStats() {
    try {
      const [france_senegal, senegal_france, en_attente] = await Promise.all([
        Colis.count({
          where: {
            direction: 'france_senegal',
            statut: { [Op.in]: ['valide','paye','collecte','en_transit','arrive_dakar','livre'] }
          }
        }),
        Colis.count({
          where: {
            direction: 'senegal_france',
            statut: { [Op.in]: ['valide','paye','collecte','en_transit','arrive_dakar','livre'] }
          }
        }),
        Colis.count({ where: { statut: 'en_attente' } })
      ]);

      return {
        success: true,
        data: {
          totalColisEnvoyes: france_senegal + senegal_france,
          france_senegal,
          senegal_france,
          en_attente
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // LISTE DES COLIS
  static async getListeColisEnvoyes({ direction = null, statut = null } = {}) {
    try {
      const whereClause = {};

      if (statut) {
        whereClause.statut = statut;
      } else {
        whereClause.statut = { [Op.in]: ['en_attente','valide','paye','collecte','en_transit','arrive_dakar','livre'] };
      }

      if (direction) whereClause.direction = direction;

      const colis = await Colis.findAll({
        where: whereClause,
        include: [
          {
            model: Utilisateur,
            as: 'utilisateur',
            attributes: ['id', 'nom', 'prenom', 'email', 'telephone']
          }
        ],
        order: [['created_at', 'DESC']]
      });

      const data = colis.map(c => ({
        id: c.id,
        numero_suivi: c.numero_suivi,
        statut: c.statut,
        categorie: c.categorie,
        direction: c.direction,
        mode_depot: c.mode_depot,
        expediteur: {
          nom: c.utilisateur?.nom,
          prenom: c.utilisateur?.prenom,
          telephone: c.utilisateur?.telephone
        },
        destinataire: {
          nom: c.nom_destinataire,
          prenom: c.prenom_destinataire,
          telephone: c.telephone_destinataire,
          adresse: c.adresse_destinataire
        },
        date_creation: c.created_at
      }));

      return { success: true, data };
    } catch (error) {
      throw error;
    }
  }

  // DÉTAIL D'UN COLIS
  static async getColisById(id) {
    try {
      const colis = await Colis.findByPk(id, {
        include: [
          {
            model: Utilisateur,
            as: 'utilisateur',
            attributes: ['id', 'nom', 'prenom', 'email', 'telephone']
          },
          {
            model: ColisSuivi,
            as: 'suivis',
            order: [['created_at', 'ASC']]
          }
        ]
      });

      return colis;
    } catch (error) {
      throw error;
    }
  }

  // VALIDER UN COLIS (CAT 2 & 3)
  static async validerColis(id, adminId) {
    try {
      const colis = await Colis.findByPk(id);
      if (!colis) throw new Error('Colis introuvable');

      await colis.update({ statut: 'valide', updated_by: adminId });

      // Historique de suivi
      await ColisSuivi.create({
        colis_id: id,
        statut: 'valide',
        localisation: colis.direction === 'france_senegal' ? 'France' : 'Sénégal',
        commentaire: 'Colis validé par l\'administrateur'
      });

      return colis;
    } catch (error) {
      throw error;
    }
  }

  // REFUSER UN COLIS
  static async refuserColis(id, raison) {
    try {
      const colis = await Colis.findByPk(id);
      if (!colis) throw new Error('Colis introuvable');

      await colis.update({ statut: 'refuse', notes_admin: raison });

      await ColisSuivi.create({
        colis_id: id,
        statut: 'refuse',
        commentaire: raison || 'Colis refusé par l\'administrateur'
      });

      return colis;
    } catch (error) {
      throw error;
    }
  }

  // CHANGER STATUT
  static async updateStatut(id, statut, commentaire = null) {
    try {
      const colis = await Colis.findByPk(id);
      if (!colis) throw new Error('Colis introuvable');

      await colis.update({ statut });

      // Localisations automatiques selon le statut
      const localisations = {
        collecte: colis.direction === 'france_senegal' ? 'France' : 'Sénégal',
        en_transit: 'En transit',
        arrive_dakar: 'Dakar, Sénégal',
        livre: colis.adresse_destinataire || 'Dakar',
        paye: colis.direction === 'france_senegal' ? 'France' : 'Sénégal',
      };

      await ColisSuivi.create({
        colis_id: id,
        statut,
        localisation: localisations[statut] || null,
        commentaire: commentaire || `Statut mis à jour : ${statut}`
      });

      return colis;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = AdminService;
