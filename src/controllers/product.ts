import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { getClearQueryString } from "../utils/functions";
import { createProductService, paginatedListService, updateProductService } from "../services/product";
import { Product } from "../interfaces/product";

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
    const body = req.body as Product;

    const product = await createProductService(body);

    res.status(201).json(product);
  } catch (error) {
    handleError(res, error);
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const body = req.body as Partial<Product>;

    const product = await updateProductService(body);

    res.status(200).json(product);
  } catch (error) {
    handleError(res, error);
  }
};