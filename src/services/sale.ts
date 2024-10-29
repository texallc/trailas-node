import { Movement } from "../interfaces/movement";
import { Product } from "../interfaces/product";
import { Sale } from "../interfaces/sale";
import { PaginatedListServiceProps } from "../interfaces/userService";
import InventoryModel from "../models/inventory";
import MovementModel from "../models/movement";
import SaleModel from "../models/sale";
import SaleDetailsModel from "../models/saleDetails";
import TotalTablesModel from "../models/totalTable";
import { bulkCreateIncrementModel, createIncrementModel, findAllModel, findByPrimaryKeyModel, findOneModel } from "../repositories";
import sequelize from "../sequelize";
import { handleErrorFunction } from "../utils/handleError";
import { Lock } from "@sequelize/core";

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
  const transaction = await sequelize.startUnmanagedTransaction();
  const userId = global.user?.id!

  try {
    const newSale = await createIncrementModel({
      model: SaleModel,
      data: { ...sale, sellerId: userId },
      where: { tableName: "sales" },
      transaction
    })

    const saleId = newSale.dataValues.id!

    const createSaleDetailsPromise = bulkCreateIncrementModel({
      model: SaleDetailsModel,
      data: sale.details.map(d => ({ ...d, saleId })),
      where: { tableName: "saleDetails" },
      transaction
    })

    const movmentPromises = sale.details.map(async d => {
      const inventory = (await findByPrimaryKeyModel({
        model: InventoryModel,
        primaryKey: (d.product as Product).inventoryId!,
        transaction,
        lock: Lock.UPDATE
      }))?.dataValues

      if (!inventory) {
        throw new Error(`Inventario del producto: ${d.product.name} no encontrado`)
      }

      if (d.quantity > inventory.stock) {
        throw new Error(`Stock insuficiente para el producto: ${d.product.name}`)
      }

      const movment: Movement = {
        typeMovement: "Salida",
        quantity: d.quantity,
        userId,
        inventoryId: (d.product as Product).inventoryId!
      }
      return movment
    })

    const createMovementaPromise = bulkCreateIncrementModel({
      model: MovementModel,
      data: await Promise.all(movmentPromises),
      where: { tableName: "movements" },
      transaction
    })

    await Promise.all([createSaleDetailsPromise, createMovementaPromise])
    await transaction.commit()

  } catch (error) {
    throw handleErrorFunction(error);
  }
};

