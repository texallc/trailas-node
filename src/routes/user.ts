import { Application, Router } from "express";
import UserModel from "../models/user";

const router = Router();

const RouteUserModel = (app: Application) => {
  router.get('/list', UserModel);
  router.post('/create', UserModel);
  router.put('/update', UserModel);
  router.delete('/delete', UserModel);

  app.use("/users", router);
}

export default RouteUserModel;