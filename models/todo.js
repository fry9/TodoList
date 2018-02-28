var connection = require('../dbConnection');

function Todo() {
    this.todoGet = function(res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM todoList' , function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.todoGetId = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM todoList WHERE todoId = ?', [id], function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.todoCreate = function(todo, res) {
        connection.acquire(function(err, con) {
            con.query('INSERT INTO todoList SET ?', todo, function(err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({status: 1, message: 'TODO creation failed'});
                } else {
                    console.log('TODO created successfully');
                    res.send({status: 0, message: 'TODO created successfully'});
                }
            });
        });
    };

    this.todoUpdate = function(todo, id, res) {
        connection.acquire(function(err, con) {
            con.query('UPDATE todoList SET ? WHERE todoId = ?', [todo, id], function(err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({status: 1, message: 'TODO update failed'});
                } else {
                    console.log('TODO updated successfully');
                    res.send({status: 0, message: 'TODO updated successfully'});
                }
            });
        });
    };

    this.todoDelete = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('DELETE FROM todoList WHERE todoId = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({status: 1, message: 'Failed to delete'});
                } else {
                    console.log('Deleted successfully');
                    res.send({status: 0, message: 'Deleted successfully'});
                }
            });
        });
    };

    this.todoGetUser = function(userName, userPass, res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM todoUsers WHERE userName = ? AND userPass = ?', [userName, userPass], function(err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({status: 1, message: 'No user found'});
                } else {
                    if (result.length > 0) {
                        if(result[0].userName === userName && result[0].userPass === userPass) {
                            console.log('User found');
                            res.send(true);
                        } else {
                            console.log('No user found');
                            res.send('No user found');
                        }
                    } else {
                        console.log('No user found');
                        res.send('No user found');
                    }
                }
            });
        });
    };
}

module.exports = new Todo();