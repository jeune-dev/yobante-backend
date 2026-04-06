const { Utilisateur, Commande, Produit, CommandeProduit} = require('../../../models');

const { Op } = require('sequelize');

class AdminService {

  // -------------------- NOMBRE DE PRODUITS ACTIFS --------------------
  static async totalProduits() { //nombreProduitActif
    try {
      const total = await Produit.count({
        where: { quantite: { [Op.gt]: 0 } }
      });
      return { message: "Nombre de produits actifs", totalProduits: total };
    } catch (error) {
      console.error("Erreur totalProduits :", error);
      throw error;
    }
  }

    // -------------------- NOMBRE DE PRODUITS INACTIFS -------------------- //nombreProduitInctif

    // -------------------- AJOUTER PRODUIT --------------------
      // -------------------- MODIFIER PRODUIT EN SE BASSANT SUR ID --------------------

        // -------------------- DESACTIVER PRODUIT --------------------

         // -------------------- ACTIVER PRODUIT --------------------

          // -------------------- LISTE PRODUIT --------------------



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

    // -------------------- NOMBRE TOTAL DE COMMANDES  REJETER--------------------


            // -------------------- LISTE COMMANDE ICI AUSSI AFFICHE AJOUTE ICI INCLUDE POUR AFFICHER L'UTILSATEUR QUI A COMMANDER VOIR LA TABLE COMMANDE utilisateurId   --------------------

              // --------------------REJETER COMMANDE --------------------

                // -------------------- VALIDER COMMANDE -------------------- //nombreCommandesJejeter



  // -------------------- CHIFFRE D’AFFAIRES -------------------- //SOMME DES COMMANDE VALIDER
  static async chiffreAffaire() {
    try {
      const total = await Commande.sum('montant_total', {
        where: { statut: 'payée' }
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

    // -------------------- NOMBRE DE CLIENTS INACTIFS --------------------

      // -------------------- LISTE DES CLIENTS --------------------

        // -------------------- ACTIVER CLIENT --------------------

          // -------------------- DESACTIVER ACTIFS --------------------




          //AJOUTER ADMIN


          //MODIFIER ADMIN


          //DESACTIVER ADMIN

          //ACTIVER ADMIN


          //AFFICHIER LISTE ADMIN

          





}

module.exports = AdminService;