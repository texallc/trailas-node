import { Application, Router } from "express";
import TotalTablesModel from "../models/totalTable";

const router = Router();

const RouteTotalTableModel = (app: Application) => {
  router.get('/list', TotalTablesModel);
  router.post('/create', TotalTablesModel);
  router.put('/update', TotalTablesModel);
  router.delete('/delete', TotalTablesModel);

  app.use("/total-tables", router);
}

export default RouteTotalTableModel;