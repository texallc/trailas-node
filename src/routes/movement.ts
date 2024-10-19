import { Application, Router } from "express";

const router = Router();

const RouteMovement = (app: Application) => {
  router.get('/list');
  router.post('/create');
  router.put('/update');
  router.delete('/delete');

  app.use("/movements", router);
};

export default RouteMovement;