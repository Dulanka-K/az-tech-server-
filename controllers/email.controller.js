const nodemailer = require('nodemailer');

function sendemail(receiver) {
    const sender = 'zaztech17@gmail.com';
    const subject = 'Warning!';
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zaztech17@gmail.com',
            pass: 'Az-tech123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: sender,
        to: receiver,
        subject: subject,
        html: '<h1>Welcome, </h1><p>Your idea is warned by admin of Innovative Idea Publishing Platfoem </p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('error');
            console.log(error);
            throw new Error('email sending failed');
            
        } else {
            res.status(200).json({
                state: true
            })
        }
    });
}

function sendNewPassword(receiver, randomPW) {
    const sender = 'zaztech17@gmail.com';
    const subject = 'Reset Password';
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zaztech17@gmail.com',
            pass: 'Az-tech123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: sender,
        to: receiver,
        subject: subject,
        html: '<h1>Welcome, </h1><p>Your new password is </p>' + randomPW
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('error');
            console.log(error);
            throw new Error('email sending failed');
            
        } else {
            res.status(200).json({
                state: true
            })
        }
    });
}

module.exports = {
    sendemail:sendemail,
    sendNewPassword: sendNewPassword
};