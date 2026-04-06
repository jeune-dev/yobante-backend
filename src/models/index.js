// models/index.js
const sequelize = require('../../config/db');

// Import des modèles
const Utilisateur = require('./utilisateur.model');
const Categorie = require('./boutique/categorie.model');
const Produit = require('./boutique/produit.model');
const Commande = require('./boutique/commande.model');
const CommandeProduit = require('./boutique/CommandeProduit.model');

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

// Export des modèles et de sequelize
module.exports = {
  sequelize,
  Utilisateur,
  Categorie,
  Produit,
  Commande,
  CommandeProduit
};