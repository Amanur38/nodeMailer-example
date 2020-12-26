"use strict";
require('dotenv').config()
const nodemailer = require("nodemailer");

async function sendMail(toMailAddress, subject, body) {

  let transporter = nodemailer.createTransport({
    host: process.env.HOST_NAME,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"How Do 👻" <${process.env.EMAIL_ADDRESS}>`, // sender address
    to: toMailAddress, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });
  return info;
}

module.exports = { sendMail };
