import { Application, Router } from "express";
import { paginatedList } from "../controllers/movement";

const router = Router();

const RouteMovement = (app: Application) => {
  router.get('/list', paginatedList);

  app.use("/movimientos", router);
};

export default RouteMovement;