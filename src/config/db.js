require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: process.env.NODE_ENV === 'production' ? {
      ssl: { require: true, rejectUnauthorized: true }
    } : {},
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
    retry: { max: 3 },
    define: { freezeTableName: true }
  }
);

module.exports = sequelize;