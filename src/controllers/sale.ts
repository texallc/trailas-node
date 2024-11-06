import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { getClearQueryString } from "../utils/functions";
import { createSaleService, paginatedListService, updateSaleService } from "../services/sale";
import { Sale } from "../interfaces/sale";

export const paginatedList: RequestHandler = async (req, res) => {
  try {
    const { pagina, limite } = getClearQueryString(req.query);

    const { list, total } = await paginatedListService({ page: +pagina, limit: +limite });

    res.status(200).json({ list, total });
  } catch (error) {
    handleError(res, error);
  }
};

export const create: RequestHandler = async (req, res) => {
  try {
    const body = req.body as Sale;

    const sale = await createSaleService(body);

    res.status(201).json(sale);
  } catch (error) {
    handleError(res, error);
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const body = req.body as Partial<Sale>;

    const sale = await updateSaleService(body);

    res.status(200).json(sale);
  } catch (error) {
    handleError(res, error);
  }
};