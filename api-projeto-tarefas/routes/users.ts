import express from "express";
import { createUser } from "../controllers/users";
const userRouter = express.Router();

userRouter.route("/create").post(createUser);

export { userRouter };
