const utils = require("../utils");
const express = require("express");
const { getUsers } = require("../controllers/users");
const userRouter = express.Router();

userRouter.get("/", getUsers);

// you can short it to req ,res
// dont export utils like that do it as the example below:
// const {functionName, functionName, functionName}= require("/utils");
// loadData => did mean loadUsers
// data is a general name please try to avoid because i dont know what data or utils.loadData return to data
// const users =getAllUsers()
// user try and catch because try and catch in node is a error boundry

// only because this is res.send i dont tell to  inline that sould be on try and catch

// create a app.use("/users", userRouter) and move it to the userRoutes.js file

userRouter.get("/passportId", (request, response) => {
  user = utils.getUser(request);
  if (!user) {
    response.status(404).send("There is no such user");
  }
  response.send(user);
});

userRouter.post("/", async (request, response) => {
  const newUser = await utils.addUser(request);
  if (!newUser) {
    response.status(404).send("There is no such user");
  }
  response.send(newUser);
});

userRouter.put("/deposit", (request, response) => {
  const data = utils.deposit(request);
  response.send(data);
});

userRouter.put("/updatecredit", (request, response) => {
  const data = utils.updateCredit(request);
  response.send(data);
});

userRouter.put("/withdraw", (request, response) => {
  const data = utils.withdraw(request);
  response.send(data);
});

userRouter.put("/transferMoney", (request, response) => {
  const data = utils.transferMoney(request);
  response.send(data);
});

module.exports = userRouter;
