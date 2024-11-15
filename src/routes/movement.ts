import { Application, Router } from "express";
import { paginatedList } from "../controllers/movement";
import isAuthenticated from "../middlewares/auth";
import isSuperAdmin from "../middlewares/isSuperAdmin";

const router = Router();

const RouteMovement = (app: Application) => {
  router.get('/list', paginatedList);

  app.use("/movimientos", [isAuthenticated, isSuperAdmin], router);
};

export default RouteMovement;