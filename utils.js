const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./models/users");

const getAllUsers = () => JSON.parse(fs.readFileSync("./users.json", "utf-8"));

const getUser = (request) => {
  const data = loadData();
  const user = data.find(
    (theUser) => theUser.passportId === parseInt(request.body.passportId)
  );
  return user;
};

const addUser = async (request) => {
  await mongoose.connect(
    "mongodb+srv://hagai:DemoHilaRotem@appleseeddemo.y7ndb.mongodb.net/Rotem?retryWrites=true&w=majority"
  );
  const newUser = new User({
    passportId: request.body.passportId,
    cash: request.body.cash,
    credit: request.body.credit,
  });

  // this is a good thing that you specify the name and the new like newUser
  if (newUser.cash === null) newUser.cash = 0;
  // oneline

  if (newUser.credit === null) newUser.credit = 0;

  await newUser.save();
  // change name from data maybe to users
  return newUser;
};

const deposit = (request) => {
  // good name
  const data = loadData();
  // bad name
  const user = data.find(
    (theUser) => theUser.passportId === parseInt(request.body.passportId)
  );
  // please use req, res and distract all the body that get like const {passwordId} = req.body on top function
  // i dont need to search over the place what you get from the user

  console.log(user); // remove console.log()
  user.cash += request.body.sum;
  // short it
  jsonData = JSON.stringify(data);
  fs.writeFileSync("./users.json", jsonData);
  return user;
};

const updateCredit = (request) => {
  const data = loadData();
  const user = data.find(
    (theUser) => theUser.passportId === parseInt(request.body.passportId)
  );
  // findUserById should go to uitls and return the user with the ID
  // good this is in one line but still look above
  user.credit = request.body.updateCredit;
  jsonData = JSON.stringify(data);
  fs.writeFileSync("./users.json", jsonData);
  return user;
};
// move all the funcions to controller and then try to move functions to utils

const withdraw = (request) => {
  const data = loadData();
  const user = data.find(
    (theUser) => theUser.passportId === parseInt(request.body.passportId)
  );
  if (user.cash > 0) {
    user.cash = user.cash - request.body.sum;
  } else if (credit > 0) {
    user.credit = user.credit - request.body.sum;
  }
  jsonData = JSON.stringify(data);
  fs.writeFileSync("./users.json", jsonData);
  return user;
};

const transferMoney = (request) => {
  const data = loadData();
  const user = data.find(
    (theUser) => theUser.passportId === parseInt(request.body.passportId)
  );
  const userToTrasfer = data.find(
    (theUser) => theUser.passportId === parseInt(request.body.transferTo)
  );
  if (user.cash > 0) {
    userToTrasfer.credit = userToTrasfer.credit + request.body.transferAmount;
    data.push((user.cash = user.cash - request.body.transferAmount));
  } else if (user.credit > 0) {
    userToTrasfer.credit = userToTrasfer.credit + request.body.transferAmount;
    user.credit = user.credit - request.body.transferAmount;
  }
  jsonData = JSON.stringify(data);
  fs.writeFileSync("./users.json", jsonData);
  return user;
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  deposit,
  updateCredit,
  withdraw,
  transferMoney,
};
