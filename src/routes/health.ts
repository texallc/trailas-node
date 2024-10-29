import { Application, Router } from "express";

const router = Router();

const RouteHealth = (app: Application) => {
  router.get('/', async (_, res) => {
    res.status(200).send({ check: "Bienvenidos al servidor de texa trailas!" });
  });

  app.use("/", router);
};

export default RouteHealth;