import { Request, Response } from "express";
import { prisma } from "../prisma";

export async function createUser(req: Request<{}, {}, User>, res: Response) {
  const user = req.body;

  if (!user.email || !user.name || !user.password) {
    res.sendStatus(400);
    return;
  }

  const userCreated = await prisma.user.create({
    data: user,
  });

  res.send(userCreated);
}
