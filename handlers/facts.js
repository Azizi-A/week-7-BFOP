const model = require("../model/facts");

const get = (req, res, next) => {
  const id = req.params.id;
  model
    .readFact(id)
    .then(facts => {
      res.send(facts);
    })
    .catch(next);
};

const getFactsAbout = (req, res, next) => {
  const name = req.params.name;
  model
    .readFactsAbout(name)
    .then(facts => {
      res.send(facts);
    })
    .catch(next);
};

const getAll = (req, res, next) => {
  model
    .readAllFacts()
    .then(facts => {
      res.send(facts);
    })
    .catch(next);
};
//is there a better/cleaner way to write this function
const update = (req, res, next) => {
  const factId = req.params.id;
  const userId = req.user.id;
  const updatedFact = req.body.text_content;
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

const create = (req, res, next) => {
  const data = {
    owner_id: req.user.id,
    text_content: req.body.text_content,
    about_who: req.body.about_who,
  };
  model
    .createFact(data)
    .then(fact => res.status(201).send(fact))
    .catch(next);
};

const del = (req, res, next) => {
  const factId = req.params.id;
  const userId = req.user.id;
  model.readFact(factId).then(fact => {
    if (fact.owner_id !== userId) {
      const error = new Error("User not autorised");
      error.status = 401;
      next(error);
    } else {
      model.deleteFact(factId).then(fact => {
        res.status(204).send("Lost 4EVAAAAAAAAAAA");
      });
    }
  });
};

module.exports = { get, getAll, update, del, create, getFactsAbout };
