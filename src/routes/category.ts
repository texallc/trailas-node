import { Application, Router } from "express";
import { create, paginatedList, update } from "../controllers/category";
import isAuthenticated from "../middlewares/auth";
import isSuperAdmin from "../middlewares/isSuperAdmin";

const router = Router();

const RouteCategory = (app: Application) => {
  router.get('/list', paginatedList);
  router.post('/create', create);
  router.put('/update', update);
  router.patch('/update', update);
  router.delete('/delete', update);

  app.use("/categorias", [isAuthenticated, isSuperAdmin], router);
};

export default RouteCategory;