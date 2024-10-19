import { RequestHandler } from "express";
// import CategoryModel from "../models/category";
// import InventoryModel from "../models/inventory";
// import MovementModel from "../models/movement";
// import ProductModel from "../models/product";
// import ProductInventory from "../models/productInventory";
// import UserModel from "../models/user";
import sequelize from "../sequelize";
import handleError from "../utils/handleError";

export const syncModels: RequestHandler = async (req, res) => {
  try {
    await sequelize.sync({ alter: true });
    // await MovementModel.sync();
    // await CategoryModel.sync();
    // await UserModel.sync();
    // await ProductModel.sync();
    // await InventoryModel.sync();
    // await ProductInventory.sync();

    console.log("All models were synchronized successfully.");

    res.status(200).json({ message: "All models were synchronized successfully." });
  } catch (error) {
    handleError(res, error);
  }
};