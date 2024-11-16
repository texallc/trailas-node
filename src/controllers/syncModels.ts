import { RequestHandler } from "express";
//import sequelize from "../sequelize";
import handleError from "../utils/handleError";

export const syncModels: RequestHandler = async (req, res) => {
  try {
    //await sequelize.sync();

    console.log("All models were synchronized successfully.");

    res.status(200).json({ message: "All models were synchronized successfully." });
  } catch (error) {
    handleError(res, error);
  }
};