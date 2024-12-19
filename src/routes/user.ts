import { Application, Router } from "express";
import { create, getByUid, paginatedList, paginatedListAdmins, paginatedListSellers, update, updateOnlyDb } from "../controllers/user";
import isAuthenticated from "../middlewares/auth";
import isSuperAdmin from "../middlewares/isSuperAdmin";

const router = Router();

const RouteUser = (app: Application) => {
  router.get('/get-by-uid', getByUid);

  //routes superAdmin
  router.get('/list', [isAuthenticated, isSuperAdmin], paginatedList);
  router.get("/list-admins", [isAuthenticated, isSuperAdmin], paginatedListAdmins);
  router.get("/list-sellers", [isAuthenticated, isSuperAdmin], paginatedListSellers);
  router.post('/create', [isAuthenticated, isSuperAdmin], create);
  router.put('/update', [isAuthenticated, isSuperAdmin], update);
  router.patch('/update', [isAuthenticated, isSuperAdmin], updateOnlyDb);

  app.use("/usuarios", router);
};

export default RouteUser;

