import { Category } from "../interfaces/category";
import { PaginatedListServiceProps } from "../interfaces/userService";
import CategoryModel from "../models/category";
import TotalTablesModel from "../models/totalTable";
import { createIncrementModel, findAllModel, findOneModel, updateModel } from "../repositories";
import sequelize from "../sequelize";

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
    const newCategory = await createIncrementModel({
      model: CategoryModel,
      data: category,
      where: { tableName: "categories" },
      transaction
    })
    await transaction.commit();
    return newCategory;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export const updateCategoryService = async (category: Partial<Category>) => {
  const transaction = await sequelize.startUnmanagedTransaction();
  try {
    const updateCategory = await updateModel({
      model: CategoryModel,
      data: category,
      where: { id: category.id },
      transaction
    })
    await transaction.commit();
    return updateCategory;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export const updateStatusCategoryService = async (id: number, active: boolean) => {
  const transaction = await sequelize.startUnmanagedTransaction();
  try {
    const updateSatatusCategory = await updateModel({
      model: CategoryModel,
      data: { id, active },
      where: { id },
      transaction
    })
    await transaction.commit();
    return updateSatatusCategory;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}