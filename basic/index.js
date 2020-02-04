var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var app = express();

//specifying the location of template/view files and 
//setting the view rendering engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//specifying the location for static files
app.use(express.static(path.join(__dirname, 'public')));
//specifying automatic parsing of POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
    res.render('home', {title:'Welcome'});
});

app.get('/about', function(req, res){
    res.render('about', {title:'About'});
});

app.listen(3000);
console.log("Server is running on port 3000");