import { validationResult } from 'express-validator';
import passport from 'passport';
import { userService } from '../services/user.service';

const userController = {

    register: async (req, res, next) => {

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

        let result = await userService.findByUsernameOrEmail(userDTO.username, userDTO.email);

        if(! result.isSuccess) {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Username/Email already exists!!'
            }
            return res.redirect('/');
        }
        result = await userService.register(userDTO);

        console.log(`save result isSuccess: ${result.isSuccess}`);
        console.log(`save result data: ${result.data}`);
        if(result.isSuccess) {
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
            res.redirect('/');
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