import { commonService } from '../services/common.service'

const commonController = {
    sendMail: (req, res, next) => {
        const contactDTO = req.body;
        const usermail = process.env['mail.user'];
        const userpass = process.env['mail.pass'];

        if(! usermail) {
            console.log("mail.user is missing in env");
            res.redirect('/');
        } 
        if(! userpass) {
            console.log("mail.pass is missing in env");
            res.redirect('/');
        }
        commonService.sendMail(contactDTO);
    }    
}

export default commonController;