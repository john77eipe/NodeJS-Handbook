import nodeMailer from 'nodemailer';

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
        return new Promise((resolve, reject) => {
            transporter.sendMail(
                mailOptions, 
                (err, info) => {
                    if(info) {
                        console.log(info.envelope);
                        console.log(info.messageId);
                        resolve(true);
                    } 
                    if(err) {
                        reject(false);
                    }
                }
            );
        });  

    }    
};