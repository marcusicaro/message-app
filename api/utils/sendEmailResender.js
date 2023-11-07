const { Resend } = require('resend');
const instanceResend = new Resend('re_fjSfSFfN_12LYtPdbifSSpUt7BwracXTv');

instanceResend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'marcusicaromc@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
});
