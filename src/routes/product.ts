import { Application, Router } from "express";
import { paginatedList } from "../controllers/product";

const router = Router();

const RouteProduct = (app: Application) => {
  router.get('/lista', paginatedList);
  router.post('/create');
  router.put('/update');
  router.delete('/delete');

  app.use("/productos", router);
};

export default RouteProduct;