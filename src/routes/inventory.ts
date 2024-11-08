import { Application, Router } from "express";
import { paginatedList, create, update } from "../controllers/inventory";

const router = Router();

const RouteInventory = (app: Application) => {
  router.get('/list', paginatedList);
  router.post('/create', create);
  router.put('/update', update);
  router.delete('/delete', update);

  app.use("/inventarios", router);
};

export default RouteInventory;
