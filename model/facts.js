const db = require("../database/connection");

const createFact = data => {
  return db.query(
    "INSERT INTO facts (owner_id, text_content, about_who) VALUES ($1, $2, $3)",
    [data.owner_id, data.text_content, data.about_who]
  ); //get $1 from jwt
  //error handling in case people leave out some values
};

const readFact = id => {
  return db.query("SELECT * FROM facts WHERE id=($1)", [id]);
};

const readRandomFact = () => {
  return db.query("SELECT * FROM facts ORDER BY RANDOM() LIMIT 1");
};

const readAllFacts = () => {
  return db.query("SELECT * FROM facts");
};

const updateFact = (content, fact_id) => {
  return db.query("UPDATE facts SET text_content = $1 WHERE id = $2", [
    content,
    fact_id,
  ]);
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
