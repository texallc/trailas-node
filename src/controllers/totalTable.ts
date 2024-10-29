import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { getClearQueryString } from "../utils/functions";
import { createTotalTablesService, paginatedListService, updateStatusTotalTablesService, updateTotalTablesService } from "../services/totalTable";
import { TotalTables } from "../interfaces/totalTables";

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
    const body = req.body as TotalTables;

    const totalTable = await createTotalTablesService(body);

    res.status(201).json(totalTable);
  } catch (error) {
    handleError(res, error);
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const body = req.body as Partial<TotalTables>;

    const totalTable = await updateTotalTablesService(body);

    res.status(200).json(totalTable);
  } catch (error) {
    handleError(res, error);
  }
};