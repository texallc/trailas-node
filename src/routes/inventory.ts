import { Application, Router } from "express";
import { paginatedList } from "../controllers/inventory";

const router = Router();

const RouteInventory = (app: Application) => {
  router.get('/list', paginatedList);
  router.post('/create');
  router.put('/update');
  router.delete('/delete');

  app.use("/inventarios", router);
};

export default RouteInventory;
