const express = require("express");
const router = express.Router();
const passport = require("passport");
const userAPI = require("../controllers/userAPI");

router.post("/login", userAPI.userLogin);

router.get(
  "/authenticate",
  passport.authenticate("jwt", { session: false }),
  userAPI.authenticate
);

router.post("/register", userAPI.register);

module.exports = router;
