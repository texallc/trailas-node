import { Category } from "../interfaces/category";
import { PaginatedListServiceProps } from "../interfaces/userService";
import CategoryModel from "../models/category";
import TotalTablesModel from "../models/totalTable";
import { createModel, findAllModel, findOneModel, incrementModel, updateModel } from "../repositories";
import sequelize from "../sequelize";
import { handleErrorFunction } from "../utils/handleError";

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

export const createCategoryService = async (category: Category) => {
  const transaction = await sequelize.startUnmanagedTransaction();

  try {
    const categoryPromise = createModel({ model: CategoryModel, data: { ...category, id: 0 }, transaction })
    const totalTablesPromise = incrementModel({ model: TotalTablesModel, where: { tableName: "categories" }, key: "total", transaction })

    await Promise.all([categoryPromise, totalTablesPromise])
  } catch (error) {
    transaction.rollback();
    throw handleErrorFunction(error);
  }
}

export const updateCategoryService = (category: Partial<Category>) =>
  updateModel({ model: CategoryModel, data: category, where: { id: category.id! } })

export const updateStatusCategoryService = (id: number, active: boolean) =>
  updateModel({ model: CategoryModel, data: { id, active }, where: { id } })