import { Application, Router } from "express";
import { syncModels } from "../controllers/syncModels";

const router = Router();

const RouteSyncModels = async (app: Application) => {
  router.get('/', syncModels);
  app.use("/sync-models", router);
  //await sequelize.sync({ alter: true });
};

export default RouteSyncModels;