const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const CommandeProduit = sequelize.define('CommandeProduit', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  utilisateur_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'utilisateur',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },

  produit_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'produits',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  commande_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'commandes',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },

  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  prix_unitaire: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'commande_produits',
  timestamps: true,
  paranoid: true,
  underscored: true
})

module.exports = CommandeProduit;