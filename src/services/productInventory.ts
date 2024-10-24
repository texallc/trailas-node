import { ProductInventory } from "../interfaces/productInventory";
import { PaginatedListServiceProps } from "../interfaces/userService";
import ProductInventoryModel from "../models/productInventory";
import TotalTablesModel from "../models/totalTable";
import { createModel, findAllModel, findOneModel } from "../repositories";

export const paginatedListService = async ({ page, limit }: PaginatedListServiceProps) => {
  try {
    const totalListPromise = findOneModel({ model: TotalTablesModel, where: { tableName: "users" } });
    const listPromise = findAllModel({ model: ProductInventoryModel, page, limit });

    const [totalList, list] = await Promise.all([totalListPromise, listPromise]);

    return { list: list.map(d => d.dataValues), total: totalList?.dataValues.total || 0 };
  } catch (error) {
    throw error;
  }
};

export const createProductInventoryService = (productInventory: ProductInventory) =>
  createModel({ model: ProductInventoryModel, data: productInventory })

export const updateProductInventoryService = (productInventory: Partial<ProductInventory>) =>
  createModel({ model: ProductInventoryModel, data: productInventory })
