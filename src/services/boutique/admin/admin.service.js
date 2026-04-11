const { Utilisateur, Commande, Produit, CommandeProduit} = require('../../../models');

const { Op } = require('sequelize');

class AdminService {

  // -------------------- NOMBRE DE PRODUITS ACTIFS --------------------
  static async totalProduits() {
  const total = await Produit.count({
    where: { statut: 'actif' }
  });

  return {
    message: "Nombre de produits actifs",
    totalProduits: total
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
      return { message: "Produit ajouté", produit };
    } catch (error) {
      console.error("Erreur ajouterProduit :", error);
      throw error;
    }
  }

  // -------------------- MODIFIER PRODUIT --------------------
  static async modifierProduit(id, data) {
    try {
      await Produit.update(data, { where: { id } });
      const produit = await Produit.findByPk(id);
      return { message: "Produit modifié", produit };
    } catch (error) {
      console.error("Erreur modifierProduit :", error);
      throw error;
    }
  }

  // -------------------- DESACTIVER PRODUIT --------------------
  static async desactiverProduit(id) {
    try {
      await Produit.update({ quantite: 0 }, { where: { id } });
      return { message: "Produit désactivé" };
    } catch (error) {
      console.error("Erreur desactiverProduit :", error);
      throw error;
    }
  }

  // -------------------- ACTIVER PRODUIT --------------------
  static async activerProduit(id, quantite = 1) {
    try {
      await Produit.update({ quantite }, { where: { id } });
      return { message: "Produit activé" };
    } catch (error) {
      console.error("Erreur activerProduit :", error);
      throw error;
    }
  }

  // -------------------- LISTE PRODUITS --------------------
  static async listeProduits() {
    try {
      const produits = await Produit.findAll();
      return { message: "Liste des produits", produits };
    } catch (error) {
      console.error("Erreur listeProduits :", error);
      throw error;
    }
  }


  // -------------------- NOMBRE TOTAL DE COMMANDES valider --------------------
  static async nombreCommandes() { //nombreCommandesValide
    try {
      const totalCommandes = await Commande.count();
      return { message: "Nombre total de commandes", totalCommandes };
    } catch (error) {
      console.error("Erreur nombreCommandes :", error);
      throw error;
    }
  }

    // -------------------- NOMBRE COMMANDES REJETEES --------------------
  static async nombreCommandesRejetees() {
    try {
      const total = await Commande.count({
        where: { statut: 'annulee' }
      });
      return { message: "Commandes rejetées", total };
    } catch (error) {
      console.error("Erreur nombreCommandesRejetees :", error);
      throw error;
    }
  }

  // -------------------- LISTE COMMANDES AVEC UTILISATEUR --------------------
  static async listeCommandes() {
    try {
      const commandes = await Commande.findAll({
        include: [
          {
            model: Utilisateur,
            attributes: ['id', 'nom', 'email']
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
      await Commande.update({ statut: 'en_attente' }, { where: { id } });
      return { message: "Commande rejetée" };
    } catch (error) {
      console.error("Erreur rejeterCommande :", error);
      throw error;
    }
  }

  // -------------------- VALIDER COMMANDE --------------------
  static async validerCommande(id) {
    try {
      await Commande.update({ statut: 'en_attente'}, { where: { id } });
      return { message: "Commande validée" };
    } catch (error) {
      console.error("Erreur validerCommande :", error);
      throw error;
    }
  }

  // -------------------- AJOUTER COMMANDE --------------------

  static async ajouterCommande(data, userId) {
  try {
    const { adresse_livraison, montant_total } = data;

    const commande = await Commande.create({
      utilisateur_id: userId,
      adresse_livraison,
      montant_total,
      statut: 'en_attente'
    });

    return {
      message: "Commande créée",
      commande
    };

  } catch (error) {
    console.error("Erreur ajouterCommande :", error);
    throw error;
  }
}



  // -------------------- CHIFFRE D’AFFAIRES -------------------- //SOMME DES COMMANDE VALIDER
  static async chiffreAffaire() {
    try {
      const total = await Commande.sum('montant_total', {
        where: { statut: 'livree' }
      }) || 0;
      return { message: "Chiffre d’affaires total", chiffreAffaire: total };
    } catch (error) {
      console.error("Erreur chiffreAffaire :", error);
      throw error;
    }
  }

  

  // -------------------- NOMBRE DE CLIENTS ACTIFS --------------------
  static async totalClients() {
    try {
      const total = await Utilisateur.count({
        where: { role: 'Acheteur', statut: 'actif' }
      });
      return { message: "Nombre de clients actifs", totalClients: total };
    } catch (error) {
      console.error("Erreur totalClients :", error);
      throw error;
    }
  }

    // -------------------- NOMBRE CLIENTS INACTIFS --------------------
    static async totalClientsInactifs() {
      try {
        const total = await Utilisateur.count({
          where: { role: 'Acheteur', statut: 'inactif' }
        });
        return { message: "Clients inactifs", total };
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
        await Utilisateur.update({ statut: 'actif' }, { where: { id } });
        return { message: "Client activé" };
      } catch (error) {
        console.error("Erreur activerClient :", error);
        throw error;
      }
    }

    // -------------------- DESACTIVER CLIENT --------------------
    static async desactiverClient(id) {
      try {
        await Utilisateur.update({ statut: 'inactif' }, { where: { id } });
        return { message: "Client désactivé" };
      } catch (error) {
        console.error("Erreur desactiverClient :", error);
        throw error;
      }
    }




  // -------------------- AJOUTER ADMIN --------------------
  static async ajouterAdmin(data) {
  try {
    const {
      nom,
      prenom,
      email,
      mot_de_passe,
      adresse,
      telephone,
      photoProfil
    } = data;

    const admin = await Utilisateur.create({
      nom,
      prenom,
      email,
      mot_de_passe,
      adresse,
      telephone,
      photoProfil,
      role: 'Admin',
      statut: 'actif'
    });

    return {
      message: "Admin ajouté",
      admin
    };

  } catch (error) {
    console.error("Erreur ajouterAdmin :", error);
    throw error;
  }
}


  // -------------------- MODIFIER ADMIN --------------------
  static async modifierAdmin(id, data) {
    try {
      await Utilisateur.update(data, { where: { id, role: 'Admin' } });
      const admin = await Utilisateur.findByPk(id);
      return { message: "Admin modifié", admin };
    } catch (error) {
      console.error("Erreur modifierAdmin :", error);
      throw error;
    }
  }

  // -------------------- DESACTIVER ADMIN --------------------
  static async desactiverAdmin(id) {
    try {
      await Utilisateur.update({ statut: 'inactif' }, { where: { id, role: 'Admin' } });
      return { message: "Admin désactivé" };
    } catch (error) {
      console.error("Erreur desactiverAdmin :", error);
      throw error;
    }
  }

  // -------------------- ACTIVER ADMIN --------------------
  static async activerAdmin(id) {
    try {
      await Utilisateur.update({ statut: 'actif' }, { where: { id, role: 'Admin' } });
      return { message: "Admin activé" };
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

          





}

module.exports = AdminService;