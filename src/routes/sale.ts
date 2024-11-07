import { Application, Router } from "express";
import { create, paginatedList, update } from "../controllers/sale";

const router = Router();

const RouteSale = (app: Application) => {
  router.get('/list', paginatedList);
  router.post('/create', create);
  router.put('/update', update);
  router.delete('/delete', update);

  app.use("/ventas", router);
};

export default RouteSale;