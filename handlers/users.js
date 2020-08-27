const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const model = require("../model/users");

const SECRET = process.env.SECRET;

// app.post("/users", users.signup);
function signup(req, res, next) {
  const newUser = req.body; //for example this would look like: {username: tc112, password: mypassword}
  //hash user password
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(newUser.password, salt))
    .then(hash =>
      model.createUser({ username: newUser.username, password: hash })
    )
    .then(user => {
      const token = jwt.sign({ user: user.id }, SECRET, { expiresIn: "1h" });
      user.access_token = token;
      delete user.password; //instead of creating a new response object without
      //the pw we delete the hashed pw from the promise object
      res.status(201).send(user);
    })
    .catch(next);
}

// app.post("/users/login", users.login);
function login(req, res, next) {
  //get req.body
  const username = req.body.username;
  const password = req.body.password;
  //get hashed pw from db matching entered username
  model
    .readUser(username)
    .then(user => {
      const compareResult = bcrypt.compare(password, user.password);
      // })
      // .then(compareResult => {
      if (!compareResult) {
        const matchError = new Error("Wrong password!");
        matchError.status = 403;
        next(matchError);
      }
      const token = jwt.sign({ user: user.id }, SECRET, { expiresIn: "1h" });
      res.status(200).send({ access_token: token });
    })
    .catch(next);
}

module.exports = { signup, login };
