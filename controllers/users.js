const { getAllUsers } = require("../utils");

const getUsers = (req, res) => {
  try {
    const users = getAllUsers();
    res.status(200).send(users);
  } catch {
    res.status(505).send("There are no users");
  }
};

module.exports = { getUsers };
