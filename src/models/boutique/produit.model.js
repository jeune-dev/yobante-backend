const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Produit = sequelize.define('Produit', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  prix: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true
  },

  statut: {
    type: DataTypes.ENUM('actif', 'inactif'),
    defaultValue: 'actif'
  },

  categorie_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  created_by: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  updated_by: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  deleted_by: {
    type: DataTypes.UUID,
    allowNull: true,
  }

}, {
  tableName: 'produits',
  timestamps: true,
  paranoid: true,
  underscored: true
});

module.exports = Produit;