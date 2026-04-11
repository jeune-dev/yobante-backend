const { Utilisateur, Commande, Produit, CommandeProduit} = require('../../../models');

const { Op } = require('sequelize');

class AdminService {

  // -------------------- NOMBRE DE PRODUITS ACTIFS --------------------
  static async totalProduitsActifs() {
    const total = await Produit.count({
      where: { statut: 'actif' }
    });

    return {
      message: "Nombre de produits actifs",
      totalProduitsActifs: total
    };
  }

  // -------------------- NOMBRE DE PRODUITS INACTIFS --------------------
  static async totalProduitsInactifs() {
    const total = await Produit.count({
      where: { statut: 'inactif' }
    });

    return {
      message: "Nombre de produits inactifs",
      totalProduitsInactifs: total
    };
  }


  // -------------------- AJOUTER PRODUIT --------------------
  static async ajouterProduit(data) {
    try {
      const produit = await Produit.create(data);
      return { 
        message: "Produit ajouté", 
        produit 
      };
    } catch (error) {
      console.error("Erreur ajouterProduit :", error);
      throw error;
    }
  }

  // -------------------- MODIFIER PRODUIT --------------------
  static async modifierProduit(id, data) {
    try {
      const produit = await Produit.findByPk(id);
      if (!produit) {
        throw new Error("Produit introuvable");
      }

      await produit.update(data);
      return {
        message: "Produit modifié",
        produit
      };
    } catch (error) {
      console.error("Erreur modifierProduit :", error);
      throw error;
    }
  }

  // -------------------- DESACTIVER PRODUIT --------------------
  static async desactiverProduit(id) {
    try {
      const produit = await Produit.findByPk(id);
      if (!produit) {
        throw new Error("Produit introuvable");
      }

      await produit.update({ statut: 'inactif' });
      return { 
        message: "Produit désactivé", 
        produit 
      };
    } catch (error) {
      console.error("Erreur desactiverProduit :", error);
      throw error;
    }
  }

  // -------------------- ACTIVER PRODUIT --------------------
  static async activerProduit(id) {
    try {
      const produit = await Produit.findByPk(id);
      if (!produit) {
        throw new Error("Produit introuvable");
      }

      await produit.update({ statut: 'actif' });
      return { 
        message: "Produit activé", 
        produit 
      };
    } catch (error) {
      console.error("Erreur activerProduit :", error);
      throw error;
    }
  }

  // -------------------- LISTE PRODUITS --------------------
  static async listeProduits() {
    try {
      const produits = await Produit.findAll();
      return { 
        message: "Liste des produits", 
        produits 
      };
    } catch (error) {
      console.error("Erreur listeProduits :", error);
      throw error;
    }
  }


  // -------------------- NOMBRE TOTAL DE COMMANDES VALIDE --------------------
  static async nombreCommandesValide() {
    try {
      const totalCommandes = await Commande.count({
        where: { statut: 'valider' }
      });
      return { message: "Nombre total de commandes validées", totalCommandes };
    } catch (error) {
      console.error("Erreur nombreCommandesValide :", error);
      throw error;
    }
  }

  // -------------------- NOMBRE COMMANDES REJETEES --------------------
  static async nombreCommandesRejetees() {
    try {
      const total = await Commande.count({
        where: { statut: 'rejeter' }
      });
      return { message: "Commandes rejetées", total };
    } catch (error) {
      console.error("Erreur nombreCommandesRejetees :", error);
      throw error;
    }
  }

  // -------------------- NOMBRE COMMANDES EN ATTENTE --------------------
  static async nombreCommandesEnAttente() {
    try {
      const total = await Commande.count({
        where: { statut: 'en_attente' }
      });
      return { message: "Commandes en attente", total };
    } catch (error) {
      console.error("Erreur nombreCommandesEnAttente :", error);
      throw error;
    }
  }

  // -------------------- NOMBRE COMMANDES LIVRÉES --------------------
  static async nombreCommandesLivre() {
    try {
      const total = await Commande.count({
        where: { statut: 'livrer' }
      });
      return { message: "Commandes livrées", total };
    } catch (error) {
      console.error("Erreur nombreCommandesLivre :", error);
      throw error;
    }
  }

  // -------------------- LISTE COMMANDES AVEC UTILISATEUR ET PRODUITS --------------------
  static async listeCommandes() {
    try {
      const commandes = await Commande.findAll({
        include: [
          {
            model: Utilisateur,
            as: 'utilisateur',
            attributes: ['id', 'nom', 'email']
          },
          {
            model: Produit,
            as: 'produits',
            attributes: ['id', 'nom', 'prix'],
            through: {
              attributes: ['quantite', 'prix_unitaire']
            }
          }
        ]
      });
      return { message: "Liste des commandes", commandes };
    } catch (error) {
      console.error("Erreur listeCommandes :", error);
      throw error;
    }
  }

  // -------------------- REJETER COMMANDE --------------------
  static async rejeterCommande(id) {
    try {
      await Commande.update(
        { statut: 'rejeter' }, 
        { where: { id } }
      );
      return { message: "Commande rejetée" };
    } catch (error) {
      console.error("Erreur rejeterCommande :", error);
      throw error;
    }
  }

  // -------------------- VALIDER COMMANDE --------------------
  static async validerCommande(id) {
    try {
      await Commande.update({ statut: 'valider'}, { where: { id } });
      return { message: "Commande validée" };
    } catch (error) {
      console.error("Erreur validerCommande :", error);
      throw error;
    }
  }

  // -------------------- LIVRER COMMANDE --------------------
  static async livrerCommande(id) {
    try {
      await Commande.update({ statut: 'livrer'}, { where: { id } });
      return { message: "Commande livrée" };
    } catch (error) {
      console.error("Erreur livrerCommande :", error);
      throw error;
    }
  }

  // -------------------- CHIFFRE D’AFFAIRES --------------------
  static async chiffreAffaire() {
    try {
      const total = await Commande.sum('montant_total', {
        where: { statut: 'livrer' }
      }) || 0;
      return { message: "Chiffre d’affaires total", chiffreAffaire: total };
    } catch (error) {
      console.error("Erreur chiffreAffaire :", error);
      throw error;
    }
  }

  // -------------------- NOMBRE DE CLIENTS ACTIFS --------------------
  static async totalClientsActifs() {
    try {
      const total = await Utilisateur.count({
        where: { role: 'Client', statut: 'actif' }
      });
      return { 
        message: "Nombre de clients actifs", 
        totalClientsActifs: total 
      };
    } catch (error) {
      console.error("Erreur totalClientsActifs :", error);
      throw error;
    }
  }

  // -------------------- NOMBRE CLIENTS INACTIFS --------------------
  static async totalClientsInactifs() {
    try {
      const total = await Utilisateur.count({
        where: { role: 'Client', statut: 'inactif' }
      });
      return { message: "Clients inactifs", totalClientsInactifs: total };
    } catch (error) {
      console.error("Erreur totalClientsInactifs :", error);
      throw error;
    }
  }

    // -------------------- LISTE CLIENTS --------------------
  static async listeClients() {
    try {
      const clients = await Utilisateur.findAll({
        where: { role: 'Client' }
      });
      return { message: "Liste des clients", clients };
    } catch (error) {
      console.error("Erreur listeClients :", error);
      throw error;
    }
  }

    // -------------------- ACTIVER CLIENT --------------------
  static async activerClient(id) {
    try {
      const client = await Utilisateur.findByPk(id);
      if (!client || client.role !== 'Client') {
        throw new Error("Client introuvable");
      }

      await client.update({ statut: 'actif' });
      return { message: "Client activé", client };
    } catch (error) {
      console.error("Erreur activerClient :", error);
      throw error;
    }
  }

  // -------------------- DESACTIVER CLIENT --------------------
  static async desactiverClient(id) {
    try {
      const client = await Utilisateur.findByPk(id);
      if (!client || client.role !== 'Client') {
        throw new Error("Client introuvable");
      }
      await client.update({ statut: 'inactif' });
      return { message: "Client désactivé", client };
    } catch (error) {
      console.error("Erreur desactiverClient :", error);
      throw error;
    }
  }

  // -------------------- AJOUTER ADMIN --------------------
    static async ajouterAdmin({
    nom,
    prenom,
    email,
    mot_de_passe,
    adresse,
    telephone,
    photoProfil,
    role = 'Admin',
    must_change_password= true

  }) {

    const t = await sequelize.transaction();

    try {
      const emailClean = email.trim().toLowerCase();

      // 🔍 Vérification email
      const exist = await Utilisateur.findOne({
        where: { email: emailClean },
        transaction: t
      });

      if (exist) {
        await t.rollback();
        return { success: false, message: "Cet email est déjà utilisé" };
      }

      // 🔍 Vérification téléphone
      if (telephone) {
        const telExist = await Utilisateur.findOne({
          where: { telephone },
          transaction: t
        });

        if (telExist) {
          await t.rollback();
          return { success: false, message: "Téléphone déjà utilisé" };
        }
      }

      // 🔐 Hash mot de passe
      const hashedPassword = await bcrypt.hash(
        mot_de_passe,
        bcryptConfig.saltRounds
      );

      // 🖼️ Upload photo
      let photoUrl = null;
      if (photoProfil?.buffer) {
        photoUrl = await uploadImage(photoProfil.buffer);
      }


      // 👤 Création utilisateur
      const utilisateur = await Utilisateur.create({
        nom,
        prenom,
        email: emailClean,
        mot_de_passe: hashedPassword,
        adresse,
        telephone,
        photoProfil: photoUrl,
        role,
        must_change_password
      }, { transaction: t });

      await t.commit();

      return {
        success: true,
        message: "Admin ajouté avec succès",
        utilisateur
      };

    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  // -------------------- MODIFIER ADMIN --------------------
  static async modifierAdmin(id, data) {
    try {
      const admin = await Utilisateur.findByPk(id);
      if (!admin || admin.role !== 'Admin') {
        throw new Error("Admin introuvable");
      }

      await admin.update(data);
      return { message: "Admin modifié", admin };
    } catch (error) {
      console.error("Erreur modifierAdmin :", error);
      throw error;
    }
  }

  // -------------------- DESACTIVER ADMIN --------------------
  static async desactiverAdmin(id) {
    try {
      const admin = await Utilisateur.findByPk(id);
      if (!admin || admin.role !== 'Admin') {
        throw new Error("Admin introuvable");
      }
      await admin.update({ statut: 'inactif' });
      return { message: "Admin désactivé", admin };
    } catch (error) {
      console.error("Erreur desactiverAdmin :", error);
      throw error;
    }
  }

  // -------------------- ACTIVER ADMIN --------------------
  static async activerAdmin(id) {
    try {
      const admin = await Utilisateur.findByPk(id);
      if (!admin || admin.role !== 'Admin') {
        throw new Error("Admin introuvable");
      }
      await admin.update({ statut: 'actif' });
      return { message: "Admin activé", admin };
    } catch (error) {
      console.error("Erreur activerAdmin :", error);
      throw error;
    }
  }

  // -------------------- LISTE ADMIN --------------------
  static async listeAdmins() {
    try {
      const admins = await Utilisateur.findAll({
        where: { role: 'Admin' }
      });
      return { message: "Liste des admins", admins };
    } catch (error) {
      console.error("Erreur listeAdmins :", error);
      throw error;
    }
  }

  // -------------------- NOMBRE TOTAL DE ADMINS ACTIFS --------------------
  static async totalAdminsActifs() {
    try {
      const total = await Utilisateur.count({
        where: { role: 'Admin', statut: 'actif' }
      });
      return { message: "Nombre d'admins actifs", totalAdminsActifs: total };
    } catch (error) {
      console.error("Erreur totalAdminsActifs :", error);
      throw error;
    }
  }

  // -------------------- NOMBRE ADMINS INACTIFS --------------------
  static async totalAdminsInactifs() {
    try {
      const total = await Utilisateur.count({
        where: { role: 'Admin', statut: 'inactif' }
      });
      return { message: "Admins inactifs", totalAdminsInactifs: total };
    } catch (error) {
      console.error("Erreur totalAdminsInactifs :", error);
      throw error;
    }
  }

}

module.exports = AdminService;