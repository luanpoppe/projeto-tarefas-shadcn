import { Response, Request } from "express";

export function initialGetController(req: Request, res: Response) {
  res.json({ message: "hello world with Typescript" });
}
