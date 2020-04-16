import express from 'express';
import commonController from '../controllers/common.controller';

const router = express.Router();

router.get('/', function(req, res) {
    res.render('home', {title:'Welcome',  user: req.user, flash: res.locals.sessionFlash });
});

router.get('/about', function(req, res) {
    res.render('about', {title:'About'});
});

router.get('/contact', function(req, res) {
    res.render('contact', {title:'Contact'});
});

router.get('/error', function(req, res) {
    res.render('error', {title:'Error'});
});

router.post('/contact/send', commonController.sendMail);

export default router;