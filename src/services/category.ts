import { Category } from "../interfaces/category";
import { PaginatedListServiceProps } from "../interfaces/userService";
import CategoryModel from "../models/category";
import TotalTablesModel from "../models/totalTable";
import { createIncrementModel, findAllModel, findOneModel, updateModel } from "../repositories";

export const paginatedListService = async ({ page, limit }: PaginatedListServiceProps) => {
  try {
    const totalListPromise = findOneModel({ model: TotalTablesModel, where: { tableName: "users" } });
    const listPromise = findAllModel({ model: CategoryModel, page, limit });

    const [totalList, list] = await Promise.all([totalListPromise, listPromise]);

    return { list: list.map(d => d.dataValues), total: totalList?.dataValues.total || 0 };
  } catch (error) {
    throw error;
  }
};

export const createCategoryService = async (category: Category) =>
  createIncrementModel({
    model: CategoryModel,
    data: category,
    where: { tableName: "categories" },
  })

export const updateCategoryService = (category: Partial<Category>) =>
  updateModel({ model: CategoryModel, data: category, where: { id: category.id } })

export const updateStatusCategoryService = (id: number, active: boolean) =>
  updateModel({ model: CategoryModel, data: { id, active }, where: { id } })