const mysql = require('mysql2');

// connecto database
const connection = mysql.createConnection(
    {
        // localhost
        host: 'localhost',
        //mySQL username
        user: 'root',
        //mySQL password
        password: 'Ahri234#',
        // this databse might need to be changed not sure what to name it.
        database: 'tracker_db'
    },
    console.log(`Connected to the db database.`)
);

// connection (NOTE DONE YET)
connection.connect(err => {
    if (err) throw err;
    
});

module.exports = connection;


