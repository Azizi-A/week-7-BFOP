const express = require("express");
require("dotenv").config();
const facts = require("./handlers/facts");
const users = require("./handlers/users");
const verifyUser = require("./middleware/auth");
const handleError = require("./middleware/error");

const PORT = process.send.PORT || 3000;

const app = express();

app.use(express.json());

// router handler directing
// these functions need to be written and imported
app.get("/facts/:member", facts.readMemberFacts);
app.get("/facts", facts.readAllFacts);
app.post("/facts/:member", verifyUser, facts.createFact);
app.put("/facts/:id", verifyUser, facts.put);
app.delete("/facts/:id", verifyUser, facts.deleteFact);

app.post("/users", users.createUser);
app.post("/users/login", users.login);
app.post("/users/logout", users.logout);

//error middleware
app.use(handleError);

app.listen(PORT, () => console.log(`Listening on http:localhost:${PORT}`));
