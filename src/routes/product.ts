import { Application, Router } from "express";
import ProductModel from "../models/product";

const router = Router();

const RouteProductModel = (app: Application) => {
  router.get('/list', ProductModel);
  router.post('/create', ProductModel);
  router.put('/update', ProductModel);
  router.delete('/delete', ProductModel);

  app.use("/products", router);
}

export default RouteProductModel;