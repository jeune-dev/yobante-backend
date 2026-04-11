const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const Notification = sequelize.define('Notification', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },

  utilisateur_id: DataTypes.UUID,

  message: DataTypes.TEXT,

  type: DataTypes.ENUM('email', 'sms', 'push'),

  lu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  tableName: 'notifications',
  timestamps: true
});
module.exports = Notification;
