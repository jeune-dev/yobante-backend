const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const Simulation = sequelize.define('Simulation', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },

  categorie: DataTypes.STRING,

  description: DataTypes.TEXT,

  email: DataTypes.STRING,

  telephone: DataTypes.STRING,

  statut: {
    type: DataTypes.ENUM('en_attente', 'proposition_envoyee', 'valide'),
    defaultValue: 'en_attente'
  },

  prix_propose: DataTypes.DECIMAL(12,2)

}, {
  tableName: 'simulations',
  timestamps: true
});
module.exports = Simulation;
