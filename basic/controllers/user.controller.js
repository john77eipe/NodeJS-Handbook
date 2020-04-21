import { validationResult } from 'express-validator';
import passport from 'passport';
import { userService } from '../services/user.service';

const userController = {

    register: (req, res, next) => {

        const userDTO = req.body;
        //image upload is not supported yet
        if(req.file) {
            console.log('Uploading File....');
            userDTO.profileimage = req.file.filename;
        } else {
            userDTO.profileimage = 'noimage.jpg';
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
        
        const result = userService.register(userDTO);

        if(result) {
            req.session.sessionFlash = {
                type: 'info',
                message: 'You have successfully registered!!!'
            }
            res.redirect('/');
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Something went wrong!!!'
            }
            res.redirect('/error');
        }
    },
    login: (req, res, next) => {

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