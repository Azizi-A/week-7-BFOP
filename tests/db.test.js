const test = require("tape");
const build = require("../database/build");
const users = require("../model/users");
const facts = require("../database/facts");
const model = { users, facts };
const db = require("../database/connection");

test("test for model.readUser", t => {
  build()
    .then(() =>
      model.users
        .readUser(1)
        .then(user => {
          t.equal(user.username, "mrladybug");
          t.equal(user.password, 12345);
          t.equal(user.cohort, "FAC50");
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

test("Close DB pool (not a real test)", t => {
  // otherwise tests will pause for 10s in the terminal
  db.end();
  t.end();
});
