import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes/route";
import { userRouter } from "./routes/users";
import { taskRouter } from "./routes/tasks";
dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use("/", router);
app.use("/user", userRouter);
app.use("/task", taskRouter);

app.all("*", (req, res) => {
  console.log("req.url: ", req.url);
  res.send("This endpoint does not exist");
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
