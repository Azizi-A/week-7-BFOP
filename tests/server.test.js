const test = require("tape");
const supertest = require("supertest");
const build = require("../database/build");
require("dotenv").config();
const app = require("../server");

test("tests for GET /facts route", t => {
  build().then(() => {
    supertest(app)
      .get("/facts")
      .then(res => {
        t.equal(res.body[0].text_content, "She paints her black dots on");
        t.equal(res.body[1].id, 2);
        t.end();
      });
  });
});

//  GET /facts/:member

// POST /facts/:member

// PUT /facts/:id

// DELETE /facts/:id
