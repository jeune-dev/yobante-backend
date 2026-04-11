const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const Collecte = sequelize.define('Collecte', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },

  colis_id: DataTypes.UUID,

  date: DataTypes.DATEONLY,
  heure: DataTypes.STRING,

  statut: {
    type: DataTypes.ENUM('planifie', 'effectue', 'annule'),
    defaultValue: 'planifie'
  }

}, {
  tableName: 'collectes',
  timestamps: true
});
module.exports = Collecte;
