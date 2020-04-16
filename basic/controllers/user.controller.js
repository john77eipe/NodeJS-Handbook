import userModel from '../daos/user.dao'
import { validationResult } from 'express-validator';
import passport from 'passport';

const userController = {
    register: (req, res, next) => {
        const fullname = req.body.fullname;
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        let profileimage = 'noimage.jpg';
        
        if(req.file) {
            console.log('Uploading File....');
            profileimage = req.file.filename;
        } else {
            console.log('No file Uploaded');
        }

        const errors = validationResult(req);
        // Check Errors
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render('register', { errors: errors.array() });
        }
        else {
            console.log('No Errors');
        }

        var newUser = new userModel.User({
            fullname: fullname,
            email: email,
            username: username,
            password: password,
            profileimage: profileimage
        });

        newUser.create((err) => {
            console.log(err);
            if(err) {
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'You have been successfully logged in'
                }
                res.redirect('/error');
            } else {
                req.session.sessionFlash = {
                    type: 'info',
                    message: 'You have successfully registered!!!'
                }
                res.redirect('/');
            }
        });
        
        
    },
    login: function(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;

        // Check Errors
        const errors = validationResult(req);
        if (errors.length>0) {
            console.log(errors);
            return res.render('login', { errors: errors.array() });
        }
        else {
            console.log('No Errors');
            req.session.sessionFlash = {
                type: 'info',
                message: 'You have been successfully logged in'
            }
        }
        passport.authenticate(
            'local', 
            {
                successRedirect: '/',
                failureRedirect: '/error' 
            }
        )(req, res, next); // <=== Do not forget to add these; the callback needs to invoke the middleware with req, res, next
            
    }    
}

export default userController;