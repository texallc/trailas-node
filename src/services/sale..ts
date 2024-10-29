import { Sale } from "../interfaces/sale";
import { PaginatedListServiceProps } from "../interfaces/userService";
import SaleModel from "../models/sale";
import TotalTablesModel from "../models/totalTable";
import { createIncrementModel, findAllModel, findOneModel } from "../repositories";
import { handleErrorFunction } from "../utils/handleError";

export const paginatedListService = async ({ page, limit }: PaginatedListServiceProps) => {
  try {
    const totalListPromise = findOneModel({ model: TotalTablesModel, where: { tableName: "users" } });
    const listPromise = findAllModel({ model: SaleModel, page, limit });

    const [totalList, list] = await Promise.all([totalListPromise, listPromise]);

    return { list: list.map(d => d.dataValues), total: totalList?.dataValues.total || 0 };
  } catch (error) {
    throw handleErrorFunction(error);
  }
};

export const createSaleService = async (sale: Sale) => {
  const userId = global.user?.id!

  try {
    const createSalePromise = createIncrementModel({
      model: SaleModel,
      data: sale,
      where: { tableName: "sales" }
    })

  } catch (error) {
    throw handleErrorFunction(error);
  }
};