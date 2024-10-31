import { Application, Router } from "express";
import { paginatedList } from "../controllers/user";
import isAuthenticated from "../middlewares/auth";

const router = Router();

const RouteUser = (app: Application) => {
  router.get('/lista', isAuthenticated, paginatedList);
  router.post('/create');
  router.put('/update');
  router.delete('/delete');

  app.use("/usuarios", router);
};

export default RouteUser;

