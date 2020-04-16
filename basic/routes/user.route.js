import express from 'express';
import multer from 'multer';
import { check } from 'express-validator';
import userController from '../controllers/user.controller';

const upload = multer({dest: './uploads'});
const router = express.Router();

router.get('/profile', function (req, res) {
    if (!req.isAuthenticated()) {
        res.redirect("/users/login");
    } else { 
        res.render('user', { title: 'User',  user: req.user});
    }
});

router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/register', 
    upload.single('profileimage'), 
    [ 
        check('email', 'Email is not valid').isEmail(),
        check('username', 'Username field is required').not().isEmpty(),
        check('password', 'Password field is required').not().isEmpty(),
        check('password').isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
        check('password').matches(/\d/).withMessage('must contain a number'),
        check('password2').custom((value, {req}) => { 
            //custom validator
            if(value!==req.body.password) {
                throw new Error('Passwords doesn\'t match');
            }
            return true;
        })
    ],
    userController.register);

    
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/login', 
    [
        check('username', 'Username field is required').not().isEmpty(),
        check('password', 'Password field is required').not().isEmpty()
    ],
    userController.login);

router.get('/logout',
    function(req, res) {
        // req.logout(); res.redirect('/');
        // passport recommends logout but sometimes it fires after the redirect
        // the below is better
        req.logout();
        req.session.destroy(function (err) {
            res.redirect('/');
        });
        // the above works fine if resave: false
        // https://medium.com/@caroline.e.okun/read-this-if-youre-using-passport-for-authentication-188d00968f1b
    });

export default router;