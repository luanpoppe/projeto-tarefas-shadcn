import { Request, Response } from "express";
import { prisma } from "../prisma";

export async function createTask(req: Request<{}, {}, Task>, res: Response) {
  const task = req.body;

  if (!task.dataVencimento || !task.priority || !task.title) {
    res.sendStatus(400);
    return;
  }
  const userId = task.userId;
  delete task.userId;

  const taskCreated = await prisma.task.create({
    data: {
      ...task,
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

  const userTasks = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      tasks: `${taskCreated.id},${userTasks?.tasks}`,
    },
  });

  res.send(taskCreated);
}

export async function getUserTask(
  req: Request<{}, {}, {}, { userId: string }>,
  res: Response
) {
  if (!req.query.userId) {
    res.sendStatus(400);
    return;
  }

  const userTasks = await prisma.user.findUnique({
    where: {
      id: Number(req.query.userId),
    },
    select: {
      tasks: true,
    },
  });

  const taskList: {
    id: number;
  }[] = [];

  const rawTaskList = userTasks?.tasks.split(",");

  if (!rawTaskList) {
    res.status(200).send([]);
    return;
  }

  rawTaskList.forEach((task) => {
    if (task === "") return;
    taskList.push({
      id: Number(task),
    });
  });

  const tasks = await prisma.task.findMany({
    where: {
      OR: taskList,
    },
  });

  console.log("tasks: ", tasks);

  res.send(tasks);
}
