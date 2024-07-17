const { Pool } = require('pg');

const pool = new Pool({
  user: 'geruiyi', 
  host: 'localhost', 
  database: 'summer project', 
  password: '123456', 
  port: 5432, 
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};