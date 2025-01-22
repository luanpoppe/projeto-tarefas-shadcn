import { Request, Response } from "express";
import { prisma } from "../prisma";

export async function createTask(req: Request<{}, {}, Task>, res: Response) {
  const task = req.body;

  if (!task.dataVencimento || !task.priority || !task.title || !task.userId) {
    res.sendStatus(400);
    return;
  }
  const userId = task.userId;
  delete task.userId;

  const taskCreated = await prisma.task.create({
    data: {
      description: task.description ?? null,
      projetoTitle: task.projetoTitle ?? null,
      title: task.title,
      isDone: task.isDone,
      user: {
        connect: {
          id: userId,
        },
      },
      dataVencimento: new Date(task.dataVencimento),
      priority:
        task.priority == 1
          ? "ALTA"
          : task.priority == 2
          ? "MEDIA"
          : task.priority == 3
          ? "BAIXA"
          : undefined,
    },
  });

  res.send(taskCreated);
}

export async function getUserTask(
  req: Request<{}, {}, {}, { userId: string; isDone?: "true" | "false" }>,
  res: Response
) {
  const isDoneParam = req.query.isDone;
  const isDoneValue =
    isDoneParam == "true" ? true : isDoneParam == "false" ? false : undefined;

  const tasks = await prisma.task.findMany({
    where: {
      userId: Number(req.query.userId),
      isDone: isDoneValue,
    },
    orderBy: {
      position: "asc",
    },
  });

  console.log("tasks: ", tasks);

  res.send(tasks);
}

export async function updateTask(req: Request<{}, {}, Task>, res: Response) {
  const task = req.body;

  if (!task.id) {
    res.sendStatus(400);
    return;
  }

  delete task.userId;

  const taskUpdated = await prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      ...task,
      dataVencimento: task.dataVencimento
        ? new Date(task.dataVencimento)
        : undefined,
      priority:
        task.priority == 1
          ? "ALTA"
          : task.priority == 2
          ? "MEDIA"
          : task.priority == 3
          ? "BAIXA"
          : undefined,
    },
  });

  res.send(taskUpdated);
}
