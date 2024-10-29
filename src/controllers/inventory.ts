import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { getClearQueryString } from "../utils/functions";
import { createInventoryService, paginatedListService, updateInventoryService, updateStatusInventoryService } from "../services/inventory";
import { Inventory } from "../interfaces/inventory";

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
    const body = req.body as Inventory;

    const inventory = await createInventoryService(body);

    res.status(201).json(inventory);
  } catch (error) {
    handleError(res, error);
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const body = req.body as Partial<Inventory>;

    const inventory = await updateInventoryService(body);

    res.status(200).json(inventory);
  } catch (error) {
    handleError(res, error);
  }
};