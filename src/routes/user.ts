import { Application, Router } from "express";
import { create, paginatedList, update } from "../controllers/user";
import isAuthenticated from "../middlewares/auth";

const router = Router();

const RouteUser = (app: Application) => {
  router.get('/list', paginatedList);
  router.post('/create', create);
  router.patch('/update', update);
  router.put('/update', update);
  router.delete('/delete', update);

  app.use("/usuarios", [isAuthenticated], router);
};

export default RouteUser;

