// models/index.js
const sequelize = require('../config/db');

// Import des modèles
const Utilisateur = require('./Utilisateur.model');

// Boutique
const Categorie = require('./boutique/categorie.model');
const Produit = require('./boutique/produit.model');
const Commande = require('./boutique/commande.model');
const CommandeProduit = require('./boutique/CommandeProduits.model');

// Colis
const Colis = require('./colis/colis.model');
const Conteneur = require('./colis/conteneur.model');
const ColisSuivi = require('./colis/colisSuivi.model');
const ColisImage = require('./colis/colisImage.model');
const Collecte = require('./colis/collecte.model');
const Paiement = require('./colis/paiement.model');
const Facture = require('./colis/facture.model');
const Notification = require('./colis/notification.model');


// -------------------- RELATIONS --------------------

// Utilisateur (1) <--> (N) Commandes
Utilisateur.hasMany(Commande, { foreignKey: 'utilisateur_id', as: 'commandes' });
Commande.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id', as: 'utilisateur' });

// Categorie (1) <--> (N) Produits
Categorie.hasMany(Produit, { foreignKey: 'categorie_id', as: 'produits' });
Produit.belongsTo(Categorie, { foreignKey: 'categorie_id', as: 'categorie' });

// Commande (N) <--> (N) Produit via table pivot CommandeProduit
Produit.belongsToMany(Commande, { 
  through: CommandeProduit, 
  foreignKey: 'produit_id', 
  as: 'commandes' 
});
Commande.belongsToMany(Produit, { 
  through: CommandeProduit, 
  foreignKey: 'commande_id', 
  as: 'produits' 
});

// Utilisateur -> Colis
Utilisateur.hasMany(Colis, { foreignKey: 'utilisateur_id', as: 'colis' });
Colis.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id', as: 'utilisateur' });

// Colis -> Suivi
Colis.hasMany(ColisSuivi, { foreignKey: 'colis_id', as: 'suivis' });
ColisSuivi.belongsTo(Colis, { foreignKey: 'colis_id', as: 'colis' });

// Colis -> Images
Colis.hasMany(ColisImage, { foreignKey: 'colis_id', as: 'images' });
ColisImage.belongsTo(Colis, { foreignKey: 'colis_id', as: 'colis' });

// Colis -> Conteneur
Conteneur.hasMany(Colis, { foreignKey: 'conteneur_id', as: 'colis' });
Colis.belongsTo(Conteneur, { foreignKey: 'conteneur_id', as: 'conteneur' });

// Colis -> Collecte
Colis.hasMany(Collecte, { foreignKey: 'colis_id', as: 'collectes' });
Collecte.belongsTo(Colis, { foreignKey: 'colis_id', as: 'colis' });

// Colis -> Paiement -> Facture
Colis.hasOne(Paiement, { foreignKey: 'colis_id', as: 'paiement' });
Paiement.belongsTo(Colis, { foreignKey: 'colis_id', as: 'colis' });

Colis.hasOne(Facture, { foreignKey: 'colis_id', as: 'facture' });
Facture.belongsTo(Colis, { foreignKey: 'colis_id', as: 'colis' });

// Utilisateur -> Notification
Utilisateur.hasMany(Notification, { foreignKey: 'utilisateur_id', as: 'notifications' });
Notification.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id', as: 'utilisateur' });


// Export des modèles et de sequelize
module.exports = {
  sequelize,
  Utilisateur,
  Categorie,
  Produit,
  Commande,
  CommandeProduit,
  Colis,
  ColisSuivi,
  ColisImage,
  Conteneur,
  Collecte,
  Paiement,
  Facture,
  Notification
};