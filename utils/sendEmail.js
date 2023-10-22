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

async function sendEmailToUser(userEmail, token, userId, type = 'signup') {
  if (type === 'recovery') {
    const info = await transporter.sendMail({
      from: '"marquinhos 👻" <marcusicaromc@gmail.com>',
      to: userEmail,
      subject: 'Password recovery link ✔',
      html: `<div>
      <p>Your recovery code is: <b>${token}</b></p>
      <a href=${process.env.BASE_URL}/user/change-password/${userId}/>Click here to reset your password</a>
      </div>`,
    });
    return;
  }

  const info = await transporter.sendMail({
    from: '"marquinhos 👻" <marcusicaromc@gmail.com>',
    to: userEmail,
    subject: 'Verification mail ✔',
    html: `<a href=${process.env.BASE_URL}/token/${userId}/${token}>Click here to validate</a>`,
  });
}

module.exports = sendEmailToUser;
