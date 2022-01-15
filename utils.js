const fs = require("fs");

const loadData = () => {
  try {
    const data = fs.readFileSync("./users.json");
    dataJson = data.toString();
    return JSON.parse(dataJson);
  } catch {
    return "There are no users";
  }
};

const getUser = (request) => {
  const data = loadData();
  const user = data.find(
    (theUser) => theUser.passportId === parseInt(request.body.passportId)
  );
  return user;
};

const addUser = (request) => {
  let data = loadData();
  const newUser = {
    passportId: data.length + 1,
    cash: request.body.cash,
    credit: request.body.credit,
  };
  if (newUser.cash === null) {
    newUser.cash = 0;
  }
  if (newUser.credit === null) {
    newUser.credit = 0;
  }
  data.push(newUser);
  jsonData = JSON.stringify(data);
  fs.writeFileSync("./users.json", jsonData);
  return newUser;
};

const deposit = (request) => {
  const data = loadData();
  const user = data.find(
    (theUser) => theUser.passportId === parseInt(request.body.passportId)
  );
  user.cash = user.cash + request.body.deposition;
  //   data.push();
  jsonData = JSON.stringify(data);
  fs.writeFileSync("./users.json", jsonData);
  return user;
};

const updateCredit = (request) => {
  const data = loadData();
  const user = data.find(
    (theUser) => theUser.passportId === parseInt(request.body.passportId)
  );
  user.credit = request.body.updateCredit;
  jsonData = JSON.stringify(data);
  fs.writeFileSync("./users.json", jsonData);
  return user;
};

const withdraw = (request) => {
  const data = loadData();
  const user = data.find(
    (theUser) => theUser.passportId === parseInt(request.body.passportId)
  );
  if (user.cash > 0) {
    user.cash = user.cash - request.body.withdrawFromAccount;
  } else if (credit > 0) {
    user.credit = user.credit - request.body.withdrawFromAccount;
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

module.exports.loadData = loadData;
module.exports.getUser = getUser;
module.exports.addUser = addUser;
module.exports.deposit = deposit;
module.exports.updateCredit = updateCredit;
module.exports.withdraw = withdraw;
module.exports.transferMoney = transferMoney;
