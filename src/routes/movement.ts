import { Application, Router } from "express";
import MovementModel from "../models/movement";

const router = Router();

const RouteMovementModel = (app: Application) => {
  router.get('/list', MovementModel);
  router.post('/create', MovementModel);
  router.put('/update', MovementModel);
  router.delete('/delete', MovementModel);

  app.use("/movements", router);
}

export default RouteMovementModel;