const { createPool } = require('mysql');

const pool = createPool({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bf0844fbd86225',
    password: '71b99177238a174',
    database: 'heroku_b938c71e4878655',
    connectionLimit: 10,
});

module.exports = pool;