const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const Facture = sequelize.define('Facture', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },

  colis_id: DataTypes.UUID,

  numero: DataTypes.STRING,
  fichier_pdf: DataTypes.STRING

}, {
  tableName: 'factures',
  timestamps: true
});
module.exports = Facture;
