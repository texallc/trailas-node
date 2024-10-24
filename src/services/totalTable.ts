import { TotalTables } from "../interfaces/totalTables";
import { PaginatedListServiceProps } from "../interfaces/userService";
import TotalTablesModel from "../models/totalTable";
import { createModel, findAllModel, findOneModel } from "../repositories";

export const paginatedListService = async ({ page, limit }: PaginatedListServiceProps) => {
  try {
    const totalListPromise = findOneModel({ model: TotalTablesModel, where: { tableName: "users" } });
    const listPromise = findAllModel({ model: TotalTablesModel, page, limit });

    const [totalList, list] = await Promise.all([totalListPromise, listPromise]);

    return { list: list.map(d => d.dataValues), total: totalList?.dataValues.total || 0 };
  } catch (error) {
    throw error;
  }
};

export const createTotalTablesService = (totalTables: TotalTables) =>
  createModel({ model: TotalTablesModel, data: totalTables })

export const updateTotalTablesService = (totalTables: Partial<TotalTables>) =>
  createModel({ model: TotalTablesModel, data: totalTables })

export const updateStatusTotalTablesService = (id: number, active: boolean) =>
  createModel({ model: TotalTablesModel, data: { id, active } })