const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const Paiement = sequelize.define('Paiement', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },

  colis_id: DataTypes.UUID,

  montant: DataTypes.DECIMAL(12,2),

  statut: {
    type: DataTypes.ENUM('en_attente', 'paye', 'echoue'),
    defaultValue: 'en_attente'
  },

  methode: DataTypes.STRING // Wave, Orange Money...

}, {
  tableName: 'paiements',
  timestamps: true
});
module.exports = Paiement;
