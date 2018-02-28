var mysql = require('mysql');

function Connection() {
    this.pool = null;

    this.init = function () {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'user',
            password: '/0SQLserverSQL1%',
            port: 3306,
            database: 'todoDb'
        });
    };

    this.acquire = function(callback) {
        this.pool.getConnection(function(err, connection) {

            if (err) {
                console.log(err);
                console.log('Database connection failed');
                callback(err, false);
            } else {
                console.log('Successful database connection');
                callback(err, connection);
            }

        });
    };
}

module.exports = new Connection();