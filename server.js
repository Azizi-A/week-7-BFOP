const express = require("express");
require("dotenv").config();
const facts = require("./handlers/facts");
const users = require("./handlers/users");
const verifyUser = require("./middleware/auth");
const handleError = require("./middleware/error");

const PORT = process.send.PORT || 3000;

const app = express();

app.use(express.json());

// ----- Router handler directing -----
// ----- Facts -----
app.get("/facts/name/:name", facts.getFactsAbout);
app.get("/facts/:id", facts.get);

app.get("/facts", facts.getAll);
app.post("/facts/", verifyUser, facts.create); //here error
app.put("/facts/:id", verifyUser, facts.update);
app.delete("/facts/:id", verifyUser, facts.del);

// ----- Users -----
app.post("/signup", users.signup);
app.post("/login", users.login);

//error middleware
app.use(handleError);

app.listen(PORT, () => console.log(`Listening on http:localhost:${PORT}`));
