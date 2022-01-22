const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  passportId: String,
  cash: Number,
  credit: Number,
});

userSchema.methods.deposit = function deposit(sum) {
  if (sum > 0) {
    this.cash += sum;
    return true;
  }
  return false;
};

module.exports = mongoose.model("Users", userSchema);
