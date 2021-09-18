const { Pool } = require('pg')

const pool = new Pool({
    user: "postgres",
    host: "postgres",
    password: "testi",
    database: "postgres",
    port: 5432
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};