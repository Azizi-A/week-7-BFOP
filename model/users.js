const db = require("../database/connection");


const createUser = data => {
  return db.query(
    "INSERT INTO users (username, password, cohort) VALUES ($1, $2, $3)",
    [data.username, data.password, data.cohort]
  );
  //error handling incase people leave out some values
};
//potentially add search id 
// end point either api/users/:id or users/:username
const readUser = username => {
  return db.query("SELECT * FROM users WHERE username=($1)", [username]);
};
//good for testing but security concern so remove in final product
const readAllUsers = () => {
  return db.query("SELECT * FROM users");
};

module.exports = { createUser, readUser, readAllUsers };
