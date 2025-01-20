import express from "express";
import { createTask, getUserTask } from "../controllers/tasks";
const taskRouter = express.Router();

taskRouter.route("/create").post(createTask);
taskRouter.route("/").get(getUserTask);

export { taskRouter };
