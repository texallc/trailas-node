import { Category } from "../interfaces/category";
import CategoryModel from "../models/category";
import { createModel, findAndCountModel, updateModel } from "../repositories";
import { PaginatedListServiceProps } from "../types/services";

export const paginatedListService = async ({ pagina: page, limite: limit }: PaginatedListServiceProps<Category>) => {
  try {
    const { count, rows } = await findAndCountModel({ model: CategoryModel, page, limit });

    return { list: rows.map(d => d.dataValues), total: count };
  } catch (error) {
    throw error;
  }
};

export const createCategoryService = async (category: Category) => createModel({
  model: CategoryModel,
  data: category,
});

export const updateCategoryService = (category: Partial<Category>) => updateModel({
  model: CategoryModel,
  data: category,
  where: { id: category.id },
});