const express = require("express");
const {
  getAllTasks,
  isIdValid,
  getTaskById,
  verifyPostRequest,
  updateToDoStatus,
  createTask,
  deleteToDoById,
} = require("../controllers/taskController");

const router = express.Router();

//represents endpoint
//for express  /todoList/tasks
router.route("/tasks").get(getAllTasks).post(verifyPostRequest, createTask);
router
  .route("/tasks/:id")
  .get(isIdValid, getTaskById)
  .patch(isIdValid, updateToDoStatus)
  .delete(isIdValid, deleteToDoById);

module.exports = router;
