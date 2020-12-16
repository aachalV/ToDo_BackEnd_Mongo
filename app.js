const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const taskRouter = require("./routes/todoRoutes");

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err, connection) => {
    if (err) {
      return console.log("Err in connecting to DB");
    }
    console.log("Successfully connected to db");

    const app = express();
    //middleware
    app.use(express.json());
    app.use("/todoList", taskRouter);

    app.listen(
      process.env.PORT,
      console.log(`App started on port ${process.env.PORT}`)
    );
  }
);
