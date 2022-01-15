const express = require("express");
const app = express();
app.use(express.json());
const utils = require("./utils");

app.get("/users", (request, response) => {
  const data = utils.loadData();
  if (!data) {
    response.status(404).send("There is no such user");
  }
  response.send(data);
});

app.get("/users/passportId", (request, response) => {
  user = utils.getUser(request);
  if (!user) {
    response.status(404).send("There is no such user");
  }
  response.send(user);
});

app.post("/users", (request, response) => {
  const newUser = utils.addUser(request);
  if (!newUser) {
    response.status(404).send("There is no such user");
  }
  response.send(newUser);
});

app.put("/users/deposit", (request, response) => {
  const data = utils.deposit(request);
  response.send(data);
});

app.put("/users/updatecredit", (request, response) => {
  const data = utils.updateCredit(request);
  response.send(data);
});

app.put("/users/withdrawFromAccount", (request, response) => {
  const data = utils.withdraw(request);
  response.send(data);
});

app.put("/users/transferMoney", (request, response) => {
  const data = utils.transferMoney(request);
  response.send(data);
});

app.listen(3000, () => console.log("Listening..."));