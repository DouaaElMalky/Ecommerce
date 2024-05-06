const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

async function userLogin(req, res) {
  try {
    const user = User.findOne({
      email: req.body.email,
    });
    if (user.length > 0) {
      const result = bcrypt.compare(req.body.password, user.password);
      if (result /*&& (!user.lockUntil || user.lockUntil < Date.now())*/) {
        if (user.lockUntil || user.lockUntil >= Date.now()) {
          return res
            .status(401)
            .json("Le compte est verouille pendant 2 MIN !!!");
        }
        user.loginAttempts = 0;
        user.lockUntil = undefined;
        user.save();
        //? login et mdp sont correct
        res.status(200).send("login succes");
      } else {
        user.loginAttempts++;
        if (user.loginAttempts >= 3) {
          user.lockUntil = Date.now() + 20 * 60 * 1000;
        }
        user.save();
        res.status(401).json("Login ou mot de passe incorrect !!!");
      }
    } else {
      res.status(401).json("Login ou mot de passe incorrect !!!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = { userLogin };
