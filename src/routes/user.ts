import { Application, Router } from "express";
import { paginatedList, update } from "../controllers/user";
import isAuthenticated from "../middlewares/auth";

const router = Router();

const RouteUser = (app: Application) => {
  router.get('/list', paginatedList);
  router.post('/create');
  router.patch('/update', update);
  router.put('/update');
  router.delete('/delete',);

  app.use("/usuarios", [isAuthenticated], router);
};

export default RouteUser;

