const fs = require("fs");
const path = require("path");
const db = require("./connection")

const initPath = path.join(__dirname, "testinit.sql");
const initSQL = fs.readFileSync(initPath, "utf-8");

const build = () => db.query(initSQL);

//lets us build the database through the terminal if we wanted to
if (require.main === module) {
    build.apply().then( () => db.end());
}

module.exports = build;