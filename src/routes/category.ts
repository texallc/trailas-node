import { Application, Router } from "express";
import { paginatedList } from "../controllers/category";

const router = Router();

const RouteCategory = (app: Application) => {
  router.get('/list', paginatedList);
  router.post('/create');
  router.put('/update');
  router.delete('/delete');

  app.use("/categorias", router);
};

export default RouteCategory;