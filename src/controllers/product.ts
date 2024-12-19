import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { clearSearchQuery } from "../utils/functions";
import { createProductService, paginatedListService, updateProductService } from "../services/product";
import { Product } from "../interfaces/product";

export const paginatedList: RequestHandler = async (req, res) => {
  try {
    const query = clearSearchQuery<Product>(req.query, ["name", "categoryId", "partNumber", "description"]);

    const { list, total } = await paginatedListService(query);

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