import { Application, Router } from "express";
import { paginatedList } from "../controllers/sale";

const router = Router();

const RouteSale = (app: Application) => {
  router.get('/list', paginatedList);
  router.post('/create');
  router.put('/update');
  router.delete('/delete');

  app.use("/ventas", router);
};

export default RouteSale;