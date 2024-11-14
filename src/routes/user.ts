import { Application, Router } from "express";
import { create, getByUid, paginatedList, update, updateOnlyDb } from "../controllers/user";
import isAuthenticated from "../middlewares/auth";
import isSuperAdmin from "../middlewares/isSuperAdmin";

const router = Router();

const RouteUser = (app: Application) => {
  router.get('/list', isSuperAdmin, paginatedList);
  router.get('/get-by-uid', getByUid);
  router.post('/create', create);
  router.put('/update', update);
  router.patch('/update', updateOnlyDb);
  router.delete('/delete', update);

  app.use("/usuarios", [isAuthenticated], router);
};

export default RouteUser;

