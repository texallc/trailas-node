import { Application, Router } from "express";
import { create, paginatedList } from "../controllers/sale";
import isAuthenticated from "../middlewares/auth";
import isSuperAdmin from "../middlewares/isSuperAdmin";

const router = Router();

const RouteSale = (app: Application) => {
  router.get('/list', paginatedList);
  router.post('/create', create);

  app.use("/ventas", [isAuthenticated, isSuperAdmin], router);
};

export default RouteSale;