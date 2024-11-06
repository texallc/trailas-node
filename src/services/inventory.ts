import { Inventory } from "../interfaces/inventory";
import { PaginatedListServiceProps } from "../interfaces/userService";
import InventoryModel from "../models/inventory";
import TotalTablesModel from "../models/totalTable";
import { createIncrementModel, findAllModel, findOneModel, updateModel } from "../repositories";

export const paginatedListService = async ({ page, limit }: PaginatedListServiceProps) => {
  try {
    const totalListPromise = findOneModel({ model: TotalTablesModel, where: { tableName: "users" } });
    const listPromise = findAllModel({ model: InventoryModel, page, limit });

    const [totalList, list] = await Promise.all([totalListPromise, listPromise]);

    return { list: list.map(d => d.dataValues), total: totalList?.dataValues.total || 0 };
  } catch (error) {
    throw error;
  }
};

export const createInventoryService = (inventory: Inventory) =>
  createIncrementModel({
    model: InventoryModel,
    data: { ...inventory, id: 0 },
    where: { tableName: "inventories" },
  })

export const updateInventoryService = (inventory: Partial<Inventory>) =>
  updateModel({ model: InventoryModel, data: inventory, where: { id: inventory.id } })

export const updateStatusInventoryService = (id: number) =>
  updateModel({ model: InventoryModel, data: { id }, where: { id } })