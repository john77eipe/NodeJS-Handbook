
export const commonService = {
    sendMail: (usermail, userpass, contactDTO) => {

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
            Name: ${contactDTO.name} Email: ${contactDTO.email} Message: ${contactDTO.message}`,
            html: `<p>You have a submission with the following details...</p>
                <ul>
                    <li>Name: ${contactDTO.name} </li>
                    <li>Email: ${contactDTO.email} </li>
                    <li>Message: ${contactDTO.message} </li>
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
};