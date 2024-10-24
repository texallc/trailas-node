import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { getClearQueryString } from "../utils/functions";
import { createProductInventoryService, paginatedListService, updateProductInventoryService } from "../services/productInventory";
import { ProductInventory } from "../interfaces/productInventory";

export const paginatedList: RequestHandler = async (req, res) => {
  try {
    const { page, limit } = getClearQueryString(req.query);

    const { list, total } = await paginatedListService({ page: +page, limit: +limit });

    res.status(200).json({ list, total });
  } catch (error) {
    handleError(res, error);
  }
};

export const create: RequestHandler = async (req, res) => {
  try {
    const body = req.body as ProductInventory;

    const productInventory = await createProductInventoryService(body);

    res.status(201).json(productInventory);
  } catch (error) {
    handleError(res, error);
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const body = req.body as Partial<ProductInventory>;

    const productInventory = await updateProductInventoryService(body);

    res.status(200).json(productInventory);
  } catch (error) {
    handleError(res, error);
  }
};