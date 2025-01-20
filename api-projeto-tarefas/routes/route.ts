import express from "express";
import { initialGetController } from "../controllers/controller";
const router = express.Router();

router.route("/").post(initialGetController).get(initialGetController);

export { router };
