const test = require("tape");
const build = require("../database/build");
const users = require("../model/users");
const facts = require("../model/facts");
const model = { users, facts };
const db = require("../database/connection");

// readUser
test("test for model.readUser", t => {
  build()
    .then(() =>
      model.users
        .readUser("mrladybug")
        .then(user => {
          t.equal(user.id, 1);
          t.equal(user.password, "12345");
          t.equal(user.cohort, "FAC50");
          t.end();
        })
        .catch(error => {
          t.error(error);
          t.end();
        })
    )
    .catch(buildError => {
      t.error(buildError);
      t.end();
    });
});

//readUserByID
test("test for model.readUserByID", t => {
  build()
    .then(() =>
      model.users
        .readUserByID(1)
        .then(result => result.rows[0])
        .then(user => {
          t.equal(user.username, "mrladybug");
          t.equal(user.password, "12345");
          t.equal(user.cohort, "FAC50");
          t.end();
        })
        .catch(error => {
          t.error(error);
          t.end();
        })
    )
    .catch(buildError => {
      t.error(buildError);
      t.end;
    });
});

//readAllUsers
test("test for reading all users", t => {
  build()
    .then(() => {
      model.users
        .readAllUsers()
        .then(users => {
          t.equal(users[0].username, "mrladybug");
          t.equal(users[1].username, "mrsladybug");
          t.end();
        })
        .catch(error => {
          t.error(error);
          t.end();
        });
    })
    .catch(buildError => {
      t.error(buildError);
      t.end();
    });
});

//readFact
test("test for reading a fact", t => {
  build()
    .then(() => {
      model.facts
        .readFact(1)
        .then(fact => {
          t.equal(fact.text_content, "She paints her black dots on");
          t.equal(fact.about_who, "mrsladybug");
          t.end();
        })
        .catch(error => {
          t.error(error);
          t.end();
        });
    })
    .catch(buildError => {
      t.error(buildError);
      t.end();
    });
});

// createFact
test("test for creating a fact", t => {
  data = {
    owner_id: 1,
    about_who: "Terrence",
    text_content: "travels the globe",
  };
  build()
    .then(() => {
      model.facts.createFact(data).then(() => {
        model.facts
          .readFact(3)
          .then(fact => {
            t.equal(fact.owner_id, 1);
            t.equal(fact.text_content, "travels the globe");
            t.equal(fact.about_who, "Terrence");
            t.end();
          })
          .catch(err => {
            t.error(err);
            t.end();
          });
      });
    })
    .catch(buildError => {
      t.err(buildError);
      t.end();
    });
});

test("Close DB pool (not a real test)", t => {
  // otherwise tests will pause for 10s in the terminal
  db.end();
  t.end();
});
