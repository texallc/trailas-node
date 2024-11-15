import { RequestHandler } from "express";
import { unauthorized } from "../utils/handleError";

const isSuperAdmin: RequestHandler = (_, res, next) => {
  try {
    if (global.user?.role !== "Super Admin") {
      unauthorized(res);
      return;
    }

    next();
  } catch (err) {
    console.error(err);
    unauthorized(res);
  }
};

export default isSuperAdmin;