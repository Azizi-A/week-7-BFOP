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
app.get("/facts/:member", facts.get);
app.get("/facts", facts.getAll);
app.post("/facts/:member", verifyUser, facts.create);
app.put("/facts/:id", verifyUser, facts.update);
app.delete("/facts/:id", verifyUser, facts.del);

app.post("/users", users.signup);
app.post("/users/login", users.login);

//error middleware
app.use(handleError);

app.listen(PORT, () => console.log(`Listening on http:localhost:${PORT}`));
