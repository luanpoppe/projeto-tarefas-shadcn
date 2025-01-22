import express from "express";
import { createTask, getUserTask, updateTask } from "../controllers/tasks";
import { requiredQueryParams } from "../validations/query-params";
const taskRouter = express.Router();

taskRouter.route("/create").post(createTask);
taskRouter.route("/update").put(updateTask);
taskRouter.route("/").get(requiredQueryParams(["userId"]), getUserTask);

export { taskRouter };
