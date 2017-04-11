'use strict'
const nodemailer = require('nodemailer');
const { MAIL_PASS, MAIL_USER } = require('../config/config.json');

module.exports = function sendMail(mailData) {

  const smtpConfig = {
    service: 'gmail',
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS
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
