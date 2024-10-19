import { Application, Router } from "express";

const router = Router();

const RouteProduct = (app: Application) => {
  router.get('/list');
  router.post('/create');
  router.put('/update');
  router.delete('/delete');

  app.use("/products", router);
};

export default RouteProduct;