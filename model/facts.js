const db = require("../database/connection");

const createFact = data => {
  return db
    .query(
      "INSERT INTO facts (owner_id, text_content, about_who) VALUES ($1, $2, $3) RETURNING *",
      [data.owner_id, data.text_content, data.about_who]
    )
    .then(result => result.row[0]); //get $1 from jwt
  //error handling incase people leave out some values
};

const readFact = id => {
  return db
    .query("SELECT * FROM facts WHERE id=($1)", [id])
    .then(result => result.rows[0]);
};

const readRandomFact = () => {
  return db
    .query("SELECT * FROM facts ORDER BY RANDOM() LIMIT 1")
    .then(result => result.rows[0]);
};

const readAllFacts = () => {
  return db.query("SELECT * FROM facts").then(result => result.rows);
};

const updateFact = (content, fact_id) => {
  return db
    .query("UPDATE facts SET text_content = $1 WHERE id = $2 RETURNING *", [
      content,
      fact_id,
    ])
    .then(result => result.rows[0]);
};

const deleteFact = fact_id => {
  return db.query("DELETE FROM facts WHERE id=$1", [fact_id]);
};

//get all posts about one person
//get all posts with same owner id

module.exports = {
  createFact,
  readFact,
  readRandomFact,
  readAllFacts,
  updateFact,
  deleteFact,
};
