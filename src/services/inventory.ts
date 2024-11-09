import { Inventory } from "../interfaces/inventory";
import { PaginatedListServiceProps } from "../interfaces/userService";
import InventoryModel from "../models/inventory";
import ProductModel from "../models/product";
import TotalTablesModel from "../models/totalTable";
import { createIncrementModel, findAllModel, findOneModel, updateModel } from "../repositories";
import sequelize from "../sequelize";

export const paginatedListService = async ({ page, limit }: PaginatedListServiceProps) => {
  try {
    const totalListPromise = findOneModel({ model: TotalTablesModel, where: { tableName: "users" } });
    const listPromise = findAllModel({
      model: InventoryModel, page, limit, include: [
        {
          model: ProductModel,
          as: 'products', // Usa el alias definido en InventoryModel
          through: { attributes: [] } // Excluye atributos de la tabla pivote si no los necesitas
        }
      ]
    });

    const [totalList, list] = await Promise.all([totalListPromise, listPromise]);

    return { list: list.map(d => d.dataValues), total: totalList?.dataValues.total || 0 };
  } catch (error) {
    throw error;
  }
};

export const createInventoryService = async (inventory: Inventory) => {
  const transaction = await sequelize.startUnmanagedTransaction();
  try {
    const newInventory = await createIncrementModel({
      model: InventoryModel,
      data: { ...inventory, id: 0 },
      where: { tableName: "inventories" },
      transaction
    })
    await transaction.commit();
    return newInventory;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export const updateInventoryService = async (inventory: Partial<Inventory>) => {
  const transaction = await sequelize.startUnmanagedTransaction();
  try {
    const updateInventory = await updateModel({
      model: InventoryModel,
      data: inventory,
      where: { id: inventory.id },
      transaction
    })
    await transaction.commit();
    return updateInventory;
  } catch (error) {
    await transaction.rollback();
    throw error
  }
}

export const updateStatusInventoryService = async (id: number) => {
  const transaction = await sequelize.startUnmanagedTransaction();
  try {
    const updateSatatusInvenotry = await updateModel({
      model: InventoryModel,
      data: { id },
      where: { id },
      transaction
    })
    await transaction.commit();
    return updateSatatusInvenotry;
  } catch (error) {
    await transaction.rollback();
    throw error
  }
}