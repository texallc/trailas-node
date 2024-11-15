

import { Request, Response, NextFunction } from "express";
import { unauthorized } from "../utils/handleError";

const isAdminBranchOffice = async (_: Request, res: Response, next: NextFunction) => {
  try {
    if (!global.user?.role || !["Super Admin", "Administrador de Sucursal"].includes(global.user?.role)) {
      unauthorized(res);
    }

    return next();
  } catch (err) {
    console.error(err);
    unauthorized(res);
  }
};

export default isAdminBranchOffice;