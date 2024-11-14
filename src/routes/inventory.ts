import { Application, Router } from "express";
import { paginatedList, paginatedListBranchOffice, update } from "../controllers/inventory";
import isAuthenticated from "../middlewares/auth";
import isSuperAdmin from "../middlewares/isSuperAdmin";
import isAdminBranchOffice from "../middlewares/isAdminBranchOffice";

const router = Router();

const RouteInventory = (app: Application) => {
  router.get('/list', isSuperAdmin, paginatedList);
  router.get("/list-by-branch-office", isAdminBranchOffice, paginatedListBranchOffice);
  router.patch('/update', isSuperAdmin, update);

  app.use("/inventarios", isAuthenticated, router);
};

export default RouteInventory;
