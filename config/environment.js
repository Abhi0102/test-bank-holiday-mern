const production = {
  name: "production",
  db: process.env.db,
  port: process.env.port,
  email: process.env.email,
  smtp: {
    service: process.env.service,
    host: process.env.host,
    port: 587,
    secure: false,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  },
  secret: process.env.secret,
};

module.exports = production;
