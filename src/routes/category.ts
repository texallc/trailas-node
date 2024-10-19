import { Application, Router } from "express";
import CategoryModel from "../models/category";

const router = Router();

const RouteCategoryModel = (app: Application) => {
  router.get('/list', CategoryModel);
  router.post('/create', CategoryModel);
  router.put('/update', CategoryModel);
  router.delete('/delete', CategoryModel);

  app.use("/categories", router);
}

export default RouteCategoryModel;