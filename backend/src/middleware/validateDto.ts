import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObj);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errors.map(err => ({
          field: err.property,
          messages: Object.values(err.constraints || {}),
        })),
      });
    }

    next();
  };
}
