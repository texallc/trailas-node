import { Application, Router } from "express";
import { paginatedList } from "../controllers/user";

const router = Router();

const RouteUser = (app: Application) => {
  router.get('/paginated-list', paginatedList);
  router.post('/create');
  router.put('/update');
  router.delete('/delete');

  app.use("/users", router);
};

export default RouteUser;

