import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { getClearQueryString } from "../utils/functions";
import { Category } from "../interfaces/category";
import { createCategoryService, paginatedListService, updateCategoryService } from "../services/category";

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
    const body = req.body as Category;

    const category = await createCategoryService(body);

    res.status(201).json(category);
  } catch (error) {
    handleError(res, error);
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const body = req.body as Partial<Category>;

    const category = await updateCategoryService(body);

    res.status(200).json(category);
  } catch (error) {
    handleError(res, error);
  }
};