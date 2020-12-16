// all the route handlers for todo list

const Task = require("../models/Task");
const AppError = require("../helpers/appErrorClass");
const sendResponse = require("../helpers/sendResponse");
const sendErrorMessage = require("../helpers/sendError");

//READ
const getAllTasks = (req, res, next) => {
  Task.find({})
    .then((allTasks) => {
      sendResponse(200, "Sucessfull", allTasks, req, res);
    })
    .catch((err) => {
      return sendErrorMessage(
        new AppError(500, "Unsuccessfull", "Internal Error...try again later"),
        req,
        res
      );
    });
};

//middleware
const verifyPostRequest = (req, res, next) => {
  console.log(req.body);
  const requiredProperties = ["taskName"];
  let result = requiredProperties.every((key) => {
    return req.body[key];
  });
  if (!result) {
    return sendErrorMessage(
      new AppError(400, "Unsuccessfull", "request body Invalid Input"),
      req,
      res
    );
  } else {
    next();
  }
};
//CREATE
const createTask = (req, res, next) => {
  let newTask = new Task({
    taskName: req.body.taskName,
    sharedWith: req.body.sharedWith,
  });
  newTask
    .save()
    .then((data) => {
      console.log("To Do Added : ", data);
      res.send("Created Successfully");
    })
    .catch((err) => {
      console.log(err);
      return sendErrorMessage(
        new AppError(400, "Unsuccessfull", "request body Invalid Input"),
        req,
        res
      );
    });
};
//Check if id is VALID
const isIdValid = async (req, res, next) => {
  let id = req.params.id;
  const isValid = await Task.findOne({ taskId: id });
  console.log(isValid);
  if (isValid == null) {
    return sendErrorMessage(
      new AppError(400, "Unsuccessfull", "Request body 'Invalid' Input"),
      req,
      res
    );
  } else {
    next();
  }
};

//FIND
//Get task by id
const getTaskById = (req, res, next) => {
  let id = req.params.id;
  Task.findOne({ taskId: id })
    .select("-_id")
    .then((task) => {
      console.log("Found task by Id >>>>");
      console.log(task);
      sendResponse(200, "Sucessfully found task by Id", task, req, res);
    })
    .catch((err) => {
      console.log(err);
    });
};

//UPDATE
const updateToDoStatus = (req, res, next) => {
  const requiredProperties = ["status"];
  let result = requiredProperties.every((key) => {
    return req.body[key];
  });
  if (!result) {
    return sendErrorMessage(
      new AppError(400, "Unsuccessfull", "Request body : Invalid Input"),
      req,
      res
    );
  } else {
    let id = req.params.id;
    Task.findOneAndUpdate({ taskId: id }, { status: req.body.status })
      .then((task) => {
        sendResponse(200, "Sucessfully found task by Id", task, req, res);
      })
      .catch((err) => {
        console.log("INTERNAL Error >>>>");
        return sendErrorMessage(
          new AppError(500, "Unsuccessfull", "Internal Error"),
          req,
          res
        );
      });
  }
};
//DELETE
const deleteToDoById = (req, res, next) => {
  let id = req.params.id;
  Task.deleteOne({ taskId: id })
    .then((task) => {
      console.log("Task Removed from Db");
      sendResponse(200, "Successfully deleted task", task, req, res);
    })
    .catch((err) => {
      console.log("Internal Error >>>>>");
      return sendErrorMessage(
        new AppError(500, "Unsuccessfull", "Internal Error"),
        req,
        res
      );
    });
};

module.exports.getAllTasks = getAllTasks;
module.exports.verifyPostRequest = verifyPostRequest;
module.exports.createTask = createTask;
module.exports.isIdValid = isIdValid;
module.exports.getTaskById = getTaskById;
module.exports.updateToDoStatus = updateToDoStatus;
module.exports.deleteToDoById = deleteToDoById;
