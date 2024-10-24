import { Inventory } from "../interfaces/inventory";
import { PaginatedListServiceProps } from "../interfaces/userService";
import InventoryModel from "../models/inventory";
import TotalTablesModel from "../models/totalTable";
import { createModel, findAllModel, findOneModel, incrementModel, updateModel } from "../repositories";
import sequelize from "../sequelize";
import { handleErrorFunction } from "../utils/handleError";

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

export const createInventoryService = async (inventory: Inventory) => {
  const transaction = await sequelize.startUnmanagedTransaction();

  try {
    const inventoryPromise = createModel({ model: InventoryModel, data: { ...inventory, id: 0 }, transaction })
    const totalTablesPromise = incrementModel({ model: TotalTablesModel, where: { tableName: "inventories" }, key: "total", transaction })

    await Promise.all([inventoryPromise, totalTablesPromise])
  } catch (error) {
    transaction.rollback();
    throw handleErrorFunction(error);
  }
}

export const updateInventoryService = (inventory: Partial<Inventory>) =>
  updateModel({ model: InventoryModel, data: inventory, where: { id: inventory.id! } })

export const updateStatusInventoryService = (id: number, active: boolean) =>
  updateModel({ model: InventoryModel, data: { id, active }, where: { id } })