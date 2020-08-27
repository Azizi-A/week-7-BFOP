const db = require("../database/connection");

const createUser = data => {
  return db
    .query(
      "INSERT INTO users (username, password, cohort) VALUES ($1, $2, $3) RETURNING id, username, cohort",
      [data.username, data.password, data.cohort]
    )
    .then(result => result.rows[0]);
  //error handling in case people leave out some values
};

// end point either api/users/:id or users/:username
const readUser = username => {
  return db
    .query("SELECT * FROM users WHERE username=($1)", [username])
    .then(result => result.rows[0]);
};

const readUserByID = id => {
  return db.query("SELECT * FROM users WHERE id=($1)", [id]);
};

//good for testing but security concern so remove in final product
const readAllUsers = () => {
  return db.query("SELECT * FROM users").then(result => result.rows);
};

module.exports = { createUser, readUser, readUserByID, readAllUsers };
