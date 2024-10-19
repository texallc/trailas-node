import { Application, Router } from "express";

const router = Router();

const RouteInventory = (app: Application) => {
  router.get('/list');
  router.post('/create');
  router.put('/update');
  router.delete('/delete');

  app.use("/inventories", router);
};

export default RouteInventory;