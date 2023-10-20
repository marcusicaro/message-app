'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendEmailToUser(userEmail, token, userId) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"marquinhos 👻" <marcusicaromc@gmail.com>', // sender address
    to: userEmail, // list of receivers
    subject: 'Verification code ✔', // Subject line
    html: `<a href=${process.env.BASE_URL}/token/${userId}/${token}>Click here to validate</a>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

module.exports = sendEmailToUser;
// sendEmailToUser().catch(console.error);
