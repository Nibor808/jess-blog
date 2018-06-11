'use strict'
const nodemailer = require('nodemailer');

module.exports = function sendMail(mailData) {

  const smtpConfig = {
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  };

  const trans = nodemailer.createTransport(smtpConfig);

  return new Promise((resolve, reject) => {
    trans.sendMail(mailData, (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    });
  });
};
