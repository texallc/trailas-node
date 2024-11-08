import { Application, Router } from "express";
import { create, paginatedList, update } from "../controllers/movement";

const router = Router();

const RouteMovement = (app: Application) => {
  router.get('/list', paginatedList);
  router.post('/create', create);
  router.put('/update', update);
  router.delete('/delete', update);

  app.use("/movimientos", router);
};

export default RouteMovement;