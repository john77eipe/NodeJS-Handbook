import { commonService } from '../services/common.service'

const commonController = {
    sendMail: (req, res, next) => {
        const contactDTO = req.body;
        const usermail = process.env['mail.user'];
        const userpass = process.env['mail.pass'];

        if(! usermail) {
            console.log("mail.user is missing in env");
            return res.redirect('/');
        } 
        if(! userpass) {
            console.log("mail.pass is missing in env");
            return res.redirect('/');
        }
        commonService.sendMail(usermail, userpass, contactDTO, function(error, info){
            if(error) {
                console.log(error);
                return res.redirect('/');
            } else {
                console.log('Message Sent: '+info.res);
                return res.redirect('/');
            }
        });
    }    
}

export default commonController;