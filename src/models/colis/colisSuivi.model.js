const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const ColisSuivi = sequelize.define('ColisSuivi', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  colis_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  statut: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  localisation: DataTypes.STRING, // ex: "Paris", "Dakar"

  commentaire: DataTypes.TEXT,

}, {
  tableName: 'colis_suivis',
  timestamps: true,
  underscored: true
});

module.exports = ColisSuivi;