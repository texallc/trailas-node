

import { Request, Response, NextFunction } from "express";
import { unauthorized } from "../utils/handleError";

const isSeller = async (_: Request, res: Response, next: NextFunction) => {
  try {
    if (!global.user?.role || !["Super Admin", "Administrador de Sucursal", "Vendedor"].includes(global.user?.role)) {
      return unauthorized(res);
    }

    return next();
  } catch (err) {
    console.error(err);
    return unauthorized(res);
  }
};

export default isSeller;