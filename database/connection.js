const pg = require("pg");
require("dotenv").config();

let connectionString = process.env.DATABASE_URL;

if (process.env.NODE_ENV === "test") {
  connectionString = process.env.TEST_DATABASE_URL;
}

const db = new pg.Pool({
  connectionString,
});

module.exports = db;
