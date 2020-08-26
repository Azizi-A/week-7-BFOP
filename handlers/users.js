const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const model = require("../model/users");

const SECRET = process.env.SECRET;

//verify that the user email does not already exist in our db

// app.post("/users", users.signup);
function signup(req, res, next) {
  let newUser = req.body;
  //   hash user password
  //   newUser.password = bcrypt(password)
  //   bcrypt.genSalt(10)
  //   .then(salt => bcrypt.hash(password, salt))

  model
    .createUser(newUser)
    .then(user => {
      token = jwt.sign({ user: user.id });
      delete user.password;
      user.access_token = token;
      res.status(201).send(user);
    })
    .catch(next);
}

// app.post("/users/login", users.login);
function login(req, res, next) {}

// app.post("/users/logout", users.logout);
function logout(req, res, next) {}

module.exports = { signup, login, logout };
