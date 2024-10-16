import { Application, Router } from "express";

const router = Router();

const RouteUsers = (app: Application) => {
  router.get('/list', list);
  router.post('/create', create);

  app.use("/usuarios", router);
}

export default RouteUsers;