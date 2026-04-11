const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const ColisImage = sequelize.define('ColisImage', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },

  colis_id: DataTypes.UUID,

  url: DataTypes.STRING,

}, {
  tableName: 'colis_images',
  timestamps: true
});
module.exports = ColisImage;
