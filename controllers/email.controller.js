const nodemailer = require('nodemailer');

function sendVerificationCode(receiver, verificationCode) {
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
        html: '<h1>Welcome, </h1><p>Your verification code for reset password is </p>' + verificationCode
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

function sendNewPassword(receiver, newpassword) {
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
        html: '<h1>Welcome, </h1><p>Your new password is </p>' + newpassword
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
    sendVerificationCode: sendVerificationCode,
    sendNewPassword: sendNewPassword
};