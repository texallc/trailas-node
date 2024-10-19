import { Application, Router } from "express";

const router = Router();

const RouteTotalTable = (app: Application) => {
  router.get('/list');
  router.post('/create');
  router.put('/update');
  router.delete('/delete');

  app.use("/total-tables", router);
};

export default RouteTotalTable;