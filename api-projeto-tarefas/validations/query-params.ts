import { NextFunction, Request, Response } from "express";

export function requiredQueryParams(paramsArray: string[]) {
  return (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction
  ) => {
    let isOk = true;
    let queryErro = "";
    req.query;
    for (let q of paramsArray) {
      if (!req.query[q]) {
        isOk = false;
        queryErro = q;
        break;
      }
    }
    console.log("isOk: ", isOk);
    if (isOk) next();
    else
      res
        .status(400)
        .send({ error: `O query parameter ${queryErro} é obrigatório` });
  };
}
