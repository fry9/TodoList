var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./dbConnection');
var routes = require('./routes');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


connection.init();
routes.configure(app);

app.use(express.static( __dirname+ '/public'));

var server = app.listen(8081, function() {
    console.log('Server listening on port ' + server.address().port);
});