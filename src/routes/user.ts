import { Application, Router } from "express";
import { paginatedList } from "../controllers/user";
import isAuthenticated from "../middlewares/auth";

const router = Router();

const RouteUser = (app: Application) => {
  router.get('/paginated-list', isAuthenticated, paginatedList);
  router.post('/create');
  router.put('/update');
  router.delete('/delete');

  app.use("/users", router);
};

export default RouteUser;

