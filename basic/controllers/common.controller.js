import { commonService } from '../services/common.service'

const commonController = {
    sendMail: (req, res, next) => {
        try {
            const contactDTO = req.body;
            const usermail = process.env['mail.user'];
            const userpass = process.env['mail.pass'];

            //environment config check
            if(! usermail) {
                console.error("mail.user is missing in env");
                return res.redirect('/');
            } 
            if(! userpass) {
                console.error("mail.pass is missing in env");
                return res.redirect('/');
            }

            //post data check
            if(contactDTO) {
                let msg = [];
                if(! contactDTO.name) {
                    msg.push('name ');
                }
                if(! contactDTO.email) {
                    msg.push('email ');
                }
                if(! contactDTO.message) {
                    msg.push('message ');
                }
                if(msg.length>0) {
                    req.session.sessionFlash = {
                        type: 'info',
                        message: `missing the following data: ${msg}`
                    }
                    return res.redirect('/');
                }
            } 

            commonService.sendMail(usermail, userpass, contactDTO);
            
            req.session.sessionFlash = {
                type: 'info',
                message: 'Mail has been sent (hopefully)!!!'
            }
            res.redirect('/');
        } catch (err) {
            console.error(err);
            req.session.sessionFlash = {
                type: 'error',
                message: 'Something went wrong!!!'
            }
            res.redirect('/');
        }
    }    
}

export default commonController;