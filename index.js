var mysql = require('mysql2');
var ejs = require('ejs');
var https = require('https');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // So secure way to do this
    password: 'root',
    database: 'skola'
});

var express = require('express');
const { getMaxListeners } = require('process');
var app = express();

app.set('view engine', 'ejs');
connection.connect();

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/ucenici', (req, res) => {
    connection.query('SELECT * from ucenici limit 3', function (err, result, fields) {
        if (err) throw err;
        let status = { created: "no", deployed: "no" };

        result.forEach((element) => {
            check_kids_status(element, status);
        });
        res.render('main', { ucenici: result });
    });
});
let that = this;
function check_kids_status(element, status) {
    if (element.gitUsername != null) {
        https.get('https://github.com/' + element.gitUsername, function (resp) {

            that.status = { created: resp.statusCode, deployed: 'yes' };
            console.log(that.status)
        });
    }
    element.gitstatus = status;
}
// https.get('https://' + element.gitUsername + '.github.io', (res) => {
//     status = res.statusCode;
// });
app.listen(3000);
//connection.end();
