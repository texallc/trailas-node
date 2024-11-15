import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { Category } from "../interfaces/category";
import { createCategoryService, paginatedListService, updateCategoryService } from "../services/category";
import { clearSearchQuery } from "../utils/functions";

export const paginatedList: RequestHandler = async (req, res) => {
  try {
    const query = clearSearchQuery<Category>(req.query);

    const { list, total } = await paginatedListService(query);

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