const mysql = require('mysql');
const mysqlCon = mysql.createConnection({
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_DATABSE,
    port: process.env.MYSQL_DB_PORT
});
module.exports = mysqlCon;