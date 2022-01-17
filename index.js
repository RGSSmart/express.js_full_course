var mysql = require('mysql2');
var ejs = require('ejs');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // So secure way to do this
    password: 'root',
    database: 'world'
});

var express = require('express');
var app = express();

app.set('view engine', 'ejs');
connection.connect();


app.get('/', (req, res) => {
    connection.query('SELECT * from city', function (err, rows, fields) {
        if (err) throw err;
        res.render('index', { rows: rows });
    });
    
});
app.listen(3000);
//connection.end();
