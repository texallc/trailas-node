import { ModelStatic, Op } from "@sequelize/core";
import { updateImage } from ".";
import { Category } from "../interfaces/category";
import CategoryModel from "../models/category";
import { createModel, findAndCountModel, updateModel } from "../repositories";
import { PaginatedListServiceProps } from "../types/services";
import { handleErrorFunction } from "../utils/handleError";
import { getClearWhere } from "../utils/functions";

export const paginatedListService = async ({ pagina: page, limite: limit, ...category }: PaginatedListServiceProps<Category>) => {
  const { name, description } = category;
  const where = getClearWhere<Category>({
    name: { [Op.iLike]: name ? `%${name}%` : "" },
    description: { [Op.iLike]: description ? `%${description}%` : "" }
  });

  try {
    const { list, total } = await findAndCountModel({ model: CategoryModel, where, page, limit });

    return { list, total };
  } catch (error) {
    throw error;
  }
};

export const createCategoryService = async (category: Category) => {
  try {
    await updateImage(category as Required<Category>, CategoryModel as ModelStatic, "categories");
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
    await updateImage(category as Required<Category>, CategoryModel as ModelStatic, "categories");
  } catch (error) {
    throw handleErrorFunction(error);
  }

  return updateModel({
    model: CategoryModel,
    data: category,
    where: { id: category.id },
  });
};