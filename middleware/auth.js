const model = require("../model/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

function verifyUser(req, res, next) {
  if (!req.headers.authorization) {
    const error = new Error("Data missing for request");
    error.status = 400;
    next(error);
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const data = jwt.verify(token, SECRET);
    model
      .getUserByID(data.user)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(next);
  } catch (_) {
    const error = new Error("Unauthorised");
    error.status = 401;
    next(error);
  }
}

model.export = verifyUser;
