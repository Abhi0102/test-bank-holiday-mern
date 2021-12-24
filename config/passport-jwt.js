const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const env = require("./environment");

const opts = {
  jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.secret,
};

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload._id, function (err, user) {
      if (err) {
        console.log("Error Finding using JWT");
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
