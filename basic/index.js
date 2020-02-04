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

app.get('/contact', function(req, res){
    res.render('contact', {title:'Contact'});
});

app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'your@email.com',
			pass: 'password'
		}
	});

	var mailOptions = {
		from: 'John Eipe <john77eipe@gmail.com>',
		to: 'support@gmail.com',
		subject: 'Website Submission',
		text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
		html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});
});

app.listen(3000);
console.log("Server is running on port 3000");