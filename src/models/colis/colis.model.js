const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const Colis = sequelize.define('Colis', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  utilisateur_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'utilisateur', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  numero_suivi: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },

  categorie: {
    type: DataTypes.ENUM('1', '2', '3'),
    allowNull: false,
  },

  direction: {
    type: DataTypes.ENUM('france_senegal', 'senegal_france'),
    defaultValue: 'france_senegal',
    allowNull: false,
  },

  statut: {
    type: DataTypes.ENUM(
      'en_attente',
      'valide',
      'paye',
      'collecte',
      'en_transit',
      'arrive_dakar',
      'livre',
      'annule',
      'refuse'
    ),
    defaultValue: 'en_attente',
    allowNull: false,
  },

  description: { type: DataTypes.TEXT, allowNull: true },

  prix_fixe: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
  prix_kilo: { type: DataTypes.DECIMAL(12, 2), allowNull: true },

  mode_depot: {
    type: DataTypes.ENUM('depot', 'collecte'),
    allowNull: true,
  },

  date_collecte: { type: DataTypes.DATEONLY, allowNull: true },
  heure_collecte: { type: DataTypes.STRING, allowNull: true },

  // Expéditeur
  adresse_expediteur: { type: DataTypes.STRING, allowNull: true },
  etage_expediteur: { type: DataTypes.STRING, allowNull: true },
  ascenseur_expediteur: { type: DataTypes.BOOLEAN, allowNull: true },

  // Destinataire
  nom_destinataire: { type: DataTypes.STRING, allowNull: false },
  prenom_destinataire: { type: DataTypes.STRING, allowNull: true },
  telephone_destinataire: { type: DataTypes.STRING, allowNull: false },
  adresse_destinataire: { type: DataTypes.STRING, allowNull: false },

  // Catégorie 1
  type_document: { type: DataTypes.STRING, allowNull: true },

  // Catégorie 2
  valeur_estimee: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
  etat_produit: { type: DataTypes.ENUM('neuf', 'occasion'), allowNull: true },

  // Catégorie 3
  longueur: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
  largeur: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
  hauteur: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
  poids_estime: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
  emballage_requis: { type: DataTypes.BOOLEAN, defaultValue: false },

  conteneur_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: 'conteneurs', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },

  notes_admin: { type: DataTypes.TEXT, allowNull: true },

  created_by: { type: DataTypes.UUID, allowNull: true },
  updated_by: { type: DataTypes.UUID, allowNull: true },
  deleted_by: { type: DataTypes.UUID, allowNull: true },

}, {
  tableName: 'colis',
  timestamps: true,
  paranoid: true,
  underscored: true,
});

module.exports = Colis;