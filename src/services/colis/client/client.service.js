const { Colis, ColisSuivi } = require('../../../models/index.js');
const { Op } = require('sequelize');

// ======================================================
// 🔢 GÉNÉRATION DU NUMÉRO DE SUIVI
// Format : YB-[CAT][DIRECTION][DATE][RANDOM]
// Exemple : YB-1FS26032026A3K
// Inspiré du format PDF : initiales + date + catégorie
// ======================================================
function genererNumeroSuivi(utilisateur, categorie, direction) {
  // Initiales de l'expéditeur (2 lettres)
  const initiales = (
    (utilisateur.prenom?.[0] || 'X') +
    (utilisateur.nom?.[0] || 'X')
  ).toUpperCase();

  // Direction courte
  const dir = direction === 'france_senegal' ? 'FS' : 'SF';

  // Date du jour DDMMYYYY
  const now = new Date();
  const jour = String(now.getDate()).padStart(2, '0');
  const mois = String(now.getMonth() + 1).padStart(2, '0');
  const annee = now.getFullYear();
  const date = `${jour}${mois}${annee}`;

  // Catégorie
  const cat = `C${categorie}`;

  // Suffixe aléatoire 4 chars pour unicité
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `YB-${initiales}${dir}${date}${cat}${random}`;
}

class ClientService {

  // ======================================================
  // 📦 ENVOYER COLIS
  // ======================================================
  static async envoyerColis(data) {
    try {
      const {
        utilisateur_id,
        categorie,
        direction,
        nom_destinataire,
        prenom_destinataire,
        telephone_destinataire,
        adresse_destinataire,
        mode_depot,
        description,
        // Cat 1
        type_document,
        // Cat 2
        valeur_estimee,
        etat_produit,
        // Cat 3
        longueur,
        largeur,
        hauteur,
        poids_estime,
        emballage_requis,
        // Collecte
        adresse_expediteur,
        etage_expediteur,
        ascenseur_expediteur,
        date_collecte,
        heure_collecte,
      } = data;

      // Récupérer l'utilisateur pour les initiales
      const { Utilisateur } = require('../../../models/index.js');
      const utilisateur = await Utilisateur.findByPk(utilisateur_id);
      if (!utilisateur) throw new Error('Utilisateur introuvable');

      // Générer le numéro de suivi
      const numero_suivi = genererNumeroSuivi(utilisateur, categorie, direction);

      const colis = await Colis.create({
        utilisateur_id,
        numero_suivi,
        categorie,
        direction,
        statut: 'en_attente',
        description,
        mode_depot,
        // Destinataire
        nom_destinataire,
        prenom_destinataire,
        telephone_destinataire,
        adresse_destinataire,
        // Cat 1
        type_document,
        // Cat 2
        valeur_estimee,
        etat_produit,
        // Cat 3
        longueur,
        largeur,
        hauteur,
        poids_estime,
        emballage_requis: emballage_requis || false,
        // Collecte
        adresse_expediteur,
        etage_expediteur,
        ascenseur_expediteur,
        date_collecte,
        heure_collecte,
      });

      // Créer la première entrée de suivi automatiquement
      await ColisSuivi.create({
        colis_id: colis.id,
        statut: 'en_attente',
        localisation: direction === 'france_senegal' ? 'France' : 'Sénégal',
        commentaire: 'Demande d\'expédition reçue - en attente de traitement'
      });

      return {
        success: true,
        data: {
          ...colis.toJSON(),
          message_info: categorie === '1'
            ? 'Votre colis de catégorie 1 est enregistré. Le prix fixe vous sera communiqué.'
            : 'Votre colis est en attente de validation par notre équipe. Vous recevrez une proposition tarifaire.'
        }
      };

    } catch (error) {
      throw error;
    }
  }

  // ======================================================
  // 📤 LISTE DES COLIS ENVOYÉS
  // ======================================================
  static async getColisEnvoyes(utilisateur_id, direction = null, statut = null) {
    try {
      const whereClause = { utilisateur_id };

      if (direction) whereClause.direction = direction;
      if (statut) whereClause.statut = statut;

      const colis = await Colis.findAll({
        where: whereClause,
        order: [['created_at', 'DESC']]
      });

      const data = colis.map(c => ({
        id: c.id,
        numero_suivi: c.numero_suivi,
        statut: c.statut,
        categorie: c.categorie,
        direction: c.direction,
        mode_depot: c.mode_depot,
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

  // ======================================================
  // 📥 LISTE DES COLIS REÇUS
  // ======================================================
  static async getColisRecus(telephone, direction = null) {
    try {
      const whereClause = {
        telephone_destinataire: telephone,
        statut: { [Op.in]: ['arrive_dakar', 'livre'] }
      };

      if (direction) whereClause.direction = direction;

      const colis = await Colis.findAll({
        where: whereClause,
        order: [['updated_at', 'DESC']]
      });

      const data = colis.map(c => ({
        id: c.id,
        numero_suivi: c.numero_suivi,
        statut: c.statut,
        direction: c.direction,
        expediteur_id: c.utilisateur_id,
        date_reception: c.updated_at
      }));

      return { success: true, data };

    } catch (error) {
      throw error;
    }
  }

  // ======================================================
  // 🔍 SUIVI D'UN COLIS PAR NUMÉRO
  // ======================================================
  static async getColisByTracking(numero_suivi) {
    try {
      const colis = await Colis.findOne({
        where: { numero_suivi },
        include: [
          {
            model: ColisSuivi,
            as: 'suivis',
            order: [['created_at', 'ASC']]
          }
        ]
      });

      if (!colis) return null;

      return {
        id: colis.id,
        numero_suivi: colis.numero_suivi,
        statut: colis.statut,
        categorie: colis.categorie,
        direction: colis.direction,
        destinataire: {
          nom: colis.nom_destinataire,
          prenom: colis.prenom_destinataire,
          adresse: colis.adresse_destinataire
        },
        historique: colis.suivis.map(s => ({
          statut: s.statut,
          localisation: s.localisation,
          commentaire: s.commentaire,
          date: s.created_at
        })),
        date_creation: colis.created_at
      };

    } catch (error) {
      throw error;
    }
  }

}

module.exports = ClientService;
