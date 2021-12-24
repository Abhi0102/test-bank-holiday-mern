const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("../config/nodemailer");
const env = require("../config/environment");

module.exports.register = async function (req, res) {
  // Checking If password matches
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(401).json({
      data: {
        success: false,
        message: `Password and Confirmed Password doesn't match `,
      },
    });
  }

  // If Password Matches
  else if (req.body.password === req.body.confirmPassword) {
    try {
      // Creating user
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      nodemailer.transporter.sendMail(
        {
          from: "sharmanoreply1@gmail.com",
          to: req.body.email,
          subject: "Hey There Welcome to the test app",
          text: `Welcome ${req.body.name} you have successfully signed in`,
        },
        (err, info) => {
          if (err) {
            console.log("Error in Sending mail", err);
            return;
          } else {
            console.log("Mail Delviered");
            return;
          }
        }
      );

      return res.status(200).json({
        data: {
          success: true,
          message: "User Successfully Created",
        },
      });
    } catch (err) {
      // If User Already exists i.e. userName is not unique
      if (err.code === 11000) {
        return res.status(401).json({
          data: {
            success: false,
            message: `User Name Already Exists `,
          },
        });
      }
    }
  }
};

module.exports.userLogin = async function (req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user && user.password === req.body.password) {
      const userJWT = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      nodemailer.transporter.sendMail(
        {
          from: env.email,
          to: req.body.email,
          subject: "Hey There Welcome to the test app",
          text: `Welcome ${req.body.name} you have successfully Logged in`,
        },
        (err, info) => {
          if (err) {
            console.log("Error in Sending mail", err);
            return;
          } else {
            console.log("Mail Delviered");
            return;
          }
        }
      );

      return res.status(200).json({
        data: {
          token: jwt.sign(userJWT, env.secret, { expiresIn: "50000000" }),
          success: true,
          user: userJWT,
        },
      });
    } else {
      return res.status(422).json({
        data: {
          success: false,
          message: "Username or Password Incorrect",
        },
      });
      // console.log("Username or Password Incorrect");
    }
  } catch (err) {
    console.log(`Error in userLogin ${err}`);
  }
};

module.exports.authenticate = function (req, res) {
  // console.log(req.body);

  return res.status(200).json({
    data: {
      success: true,
    },
  });
};
