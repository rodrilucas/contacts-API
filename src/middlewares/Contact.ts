import type { NextFunction, Request, Response } from "express";
import type { Contact as ContactInterface } from "../types/types";
import { createContactSchema } from "../validators/contact";

class Contact {
  private fieldErrorsValidate(data: ContactInterface) {
    const result = createContactSchema.safeParse(data);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      return fieldErrors;
    }

    return {};
  }

  middleware = (
    req: Request<{}, {}, ContactInterface>,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body;

    if (!Object.keys(data).length) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios não fornecidos!" });
    }

    const validateErrors = this.fieldErrorsValidate(data);

    if (Object.keys(validateErrors).length > 0) {
      return res.status(400).json({
        errors: validateErrors,
      });
    }

    next();
  };
}

export default new Contact();
