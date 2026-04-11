const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const Conteneur = sequelize.define('Conteneur', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },

  numero: DataTypes.STRING,

  statut: {
    type: DataTypes.ENUM('ouvert', 'ferme', 'en_transit', 'arrive'),
    defaultValue: 'ouvert'
  },

  date_depart: DataTypes.DATE,
  date_arrivee: DataTypes.DATE

}, {
  tableName: 'conteneurs',
  timestamps: true
});module.exports = Conteneur;
