var express = require('express');
var multer = require('multer');
var upload = multer({dest: './uploads'});
var UserModel = require('../models/user');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('user', { title: 'User' });
});

router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/register', upload.single('profileimage'),  function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    if(req.file) {
        console.log('Uploading File....');
        var profileimage = req.file.filename;
    } else {
        console.log('No file Uploaded');
        var profileimage = 'noimage.jpg';
    }

    //TODO: form validation

    //if errors handle accordingly

    var newUser = new UserModel({
        name: name,
        email: email,
        username: username,
        password: password,
        profileimage: profileimage
    });

    newUser.save()
        .then(doc => {
            console.log(doc);
        })
        .catch(err => {
           console.error(err);
        });
    res.location('/');
    res.redirect('/');
});

router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Login' });
});

module.exports = router;