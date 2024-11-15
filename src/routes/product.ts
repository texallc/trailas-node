import { Application, Router } from "express";
import { create, paginatedList, update } from "../controllers/product";
import isAuthenticated from "../middlewares/auth";
import isSuperAdmin from "../middlewares/isSuperAdmin";

const router = Router();

const RouteProduct = (app: Application) => {
  router.get('/list', paginatedList);
  router.post('/create', create);
  router.put('/update', update);
  router.delete('/delete', update);

  app.use("/productos", [isAuthenticated, isSuperAdmin], router);
};

export default RouteProduct;
