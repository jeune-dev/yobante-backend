const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const CommandeProduit = sequelize.define('Commande', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  quantite: {
    type: require('sequelize').DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  prix_unitaire: {
    type: require('sequelize').DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'commande_produits',
  timestamps: true,
  paranoid: true,
  underscored: true
})

module.exports = CommandeProduit;