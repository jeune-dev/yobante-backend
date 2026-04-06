const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Utilisateur = sequelize.define('Utilisateur', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  photoProfil: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
  role: {
    type: DataTypes.ENUM('Admin', 'Client'),
    defaultValue: 'Client',
    allowNull: false
    },
  statut: {
    type: DataTypes.ENUM('actif', 'inactif'),
    defaultValue: 'actif'
  },
  must_change_password: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  is_connected: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  last_login: {
    type: DataTypes.DATE,
    allowNull: true
  }


}, {
  tableName: 'utilisateur',
  timestamps: true,
  paranoid: true, 
  underscored: true
});

module.exports = Utilisateur;
