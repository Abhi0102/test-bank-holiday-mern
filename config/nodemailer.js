const nodemailer = require("nodemailer");
const env = require("./environment");

let transporter = nodemailer.createTransport(env.smtp);

module.exports = { transporter };
