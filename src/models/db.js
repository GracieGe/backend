const { Pool } = require('pg');
const dbConfig = require('../config/db.config');

const pool = new Pool(dbConfig);

pool.on('connect', () => {
  console.log('Connected to the database');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};