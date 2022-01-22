const express = require("express");
const app = express();
app.use(express.json());
const utils = require("./utils");
const cors = require("cors");
const userRouter = require("./routes/users");
app.use(cors());
require("dotenv").config(); // move it to the top of the file

app.use("/users", userRouter);

app.listen(process.env.PORT || 8080, () =>
  console.log(`Server is up and running on port ${process.env.PORT || 8080}`)
);

// good code keep going
