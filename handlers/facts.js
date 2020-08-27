const model = require("../model/facts");

// app.post("/facts/:member", verifyUser, facts.create);
// app.delete("/facts/:id", verifyUser, facts.del);

function get(req, res, next) {
  const id = req.params.id;
  model
    .readFact(id)
    .then(facts => {
      res.send(facts);
    })
    .catch(next);
}

const getAll = (req, res, next) => {
  model
    .readAllFacts()
    .then(facts => {
      res.send(facts);
    })
    .catch(next);
};

const update = (req, res, next) => {
  const factId = req.params.id;
  const userId = req.user.id;
  const updatedFact = req.body;
  model
    .readFact(factId)
    .then(fact => {
      //check that the user is the same as the author of the fact
      //first use factid to find out who wrote it
      //compare who wrote it to current logged in person
      if (fact.owner_id !== userId) {
        //if !match then send new error to middleware
        const error = new Error("User not autorised");
        error.status = 401;
        next(error);
      } else {
        // if fine, update fact
        model.updateFact(updatedFact, factId).then(fact => {
          res.status(200).send(fact);
        });
      }
    })
    .catch(next);
};
/*const createFact = data => {
  return db.query(
    "INSERT INTO users (owner_id, text_content, about_who) VALUES ($1, $2, $3)",
    [data.owner_id, data.text_content, data.about_who]
  ); //get $1 from jwt
  //error handling incase people leave out some values
};
 */
const create = (req, res, next) => {
  const data = {
    owner_id: req.user.id,
    text_content: req.body,
    about_who: "huh",
  };
  model.createFact(data).then();
};

module.exports = { get, getAll, update, del };
