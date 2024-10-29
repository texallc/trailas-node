

import { Request, Response, NextFunction } from "express";
import { unauthorized } from "../utils/handleError";

const isSuperAdmin = async (_: Request, res: Response, next: NextFunction) => {
  try {
    if (!global.user?.role || !["Super Admin", "Administrador de Sucursal"].includes(global.user?.role)) {
      return unauthorized(res);
    }

    return next();
  } catch (err) {
    console.error(err);
    return unauthorized(res);
  }
};

export default isSuperAdmin;