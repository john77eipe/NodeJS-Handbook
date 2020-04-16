import nodeMailer from 'nodemailer';

const commonController = {
    sendMail: (req, res, next) => {

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
        var transporter = nodeMailer.createTransport({
            service: 'Gmail',
            auth: {
                user: usermail,
                pass: userpass
            }
        });
    
        var mailOptions = {
            from: usermail,
            to: 'support@yopmail.com',
            subject: 'Website Submission',
            text: `You have a submission with the following details... 
            Name: ${req.body.name} Email: ${req.body.email} Message: ${req.body.message}`,
            html: `<p>You have a submission with the following details...</p>
                <ul>
                    <li>Name: ${req.body.name} </li>
                    <li>Email: ${req.body.email} </li>
                    <li>Message: ${req.body.message} </li>
                </ul>`
        };
    
        transporter.sendMail(mailOptions, function(error, info){
            if(error) {
                console.log(error);
                res.redirect('/');
            } else {
                console.log('Message Sent: '+info.res);
                res.redirect('/');
            }
        });
    }    
}

export default commonController;