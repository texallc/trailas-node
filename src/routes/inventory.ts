import { Application, Router } from "express";
import InventoryModel from "../models/inventory";

const router = Router();

const RouteInventoryModel = (app: Application) => {
  router.get('/list', InventoryModel);
  router.post('/create', InventoryModel);
  router.put('/update', InventoryModel);
  router.delete('/delete', InventoryModel);

  app.use("/inventories", router);
}

export default RouteInventoryModel;