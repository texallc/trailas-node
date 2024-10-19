import { Application, Router } from "express";

const router = Router();

const RouteCategory = (app: Application) => {
  router.get('/list');
  router.post('/create');
  router.put('/update');
  router.delete('/delete');

  app.use("/categories", router);
};

export default RouteCategory;