const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

/*
Key Differences:
Scope of update: PUT replaces the entire resource, PATCH modifies specific fields.
Data sent: PUT requires all fields, PATCH only requires fields to be updated.
*/

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
