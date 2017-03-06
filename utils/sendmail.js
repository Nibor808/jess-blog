const nodemailer = require('nodemailer');
const { MAIL_PASS } = require('../config/config.json');

module.exports = function sendMail(mailData) {

  const smtpConfig = {
    service: 'gmail',
    auth: {
      user: 'jessica.e.austen@gmail.com',
      pass: MAIL_PASS
    }
  }

  const trans = nodemailer.createTransport(smtpConfig);

  return new Promise((reject, resolve) => {
    trans.sendMail(mailData, err => {
      if (err) { return reject(err); }
      else { return resolve(); }
    });
  })
}