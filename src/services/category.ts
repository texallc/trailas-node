import { ModelStatic } from "@sequelize/core";
import { updateImage } from ".";
import { Category } from "../interfaces/category";
import CategoryModel from "../models/category";
import { createModel, findAndCountModel, updateModel } from "../repositories";
import { PaginatedListServiceProps } from "../types/services";
import { handleErrorFunction } from "../utils/handleError";

export const paginatedListService = async ({ pagina: page, limite: limit }: PaginatedListServiceProps<Category>) => {
  try {
    const { count, rows } = await findAndCountModel({ model: CategoryModel, page, limit });

    return { list: rows.map(d => d.dataValues), total: count };
  } catch (error) {
    throw error;
  }
};

export const createCategoryService = async (category: Category) => {
  try {
    await updateImage(category as Required<Category>, CategoryModel as ModelStatic);
  } catch (error) {
    throw handleErrorFunction(error);
  }

  return createModel({
    model: CategoryModel,
    data: category,
  });
};

export const updateCategoryService = async (category: Partial<Category>) => {
  try {
    await updateImage(category as Required<Category>, CategoryModel as ModelStatic);
  } catch (error) {
    throw handleErrorFunction(error);
  }

  return updateModel({
    model: CategoryModel,
    data: category,
    where: { id: category.id },
  });
};