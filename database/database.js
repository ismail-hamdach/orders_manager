const mysql = require('mysql')

// Create Connection With the MySQL DB
const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

// Connect to the DB
db.connect((err) => {
    if (err) throw err
    console.log('MySQL Database Connected');
})

module.exports = db;