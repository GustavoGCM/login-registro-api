import { NextFunction, Response, Request } from "express";
import { ZodTypeAny } from "zod";

export const dataValidation =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.parse(req.body);
    req.body = validation;

    return next();
};
