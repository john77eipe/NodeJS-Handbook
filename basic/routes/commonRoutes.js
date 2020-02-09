var express = require('express');
var nodeMailer = require('nodemailer');
var router = express.Router();

router.get('/', function(req, res){
    res.render('home', {title:'Welcome'});
});

router.get('/about', function(req, res){
    res.render('about', {title:'About'});
});

router.get('/contact', function(req, res){
    res.render('contact', {title:'Contact'});
});

router.post('/contact/send', function(req, res){
	var transporter = nodeMailer.createTransport({
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

module.exports = router;