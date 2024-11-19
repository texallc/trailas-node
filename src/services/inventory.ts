import InventoryModel from "../models/inventory";
import { Inventory } from "../interfaces/inventory";
import { createModel, findAndCountModel, incrementModel } from "../repositories";
import { PaginatedListServiceProps } from "../types/services";
import ProductModel from "../models/product";
import sequelize from "../sequelize";
import MovementModel from "../models/movement";

export const paginatedListService = async ({ pagina: page, limite: limit }: PaginatedListServiceProps<Inventory>) => {
  try {
    const { count, rows } = await findAndCountModel({
      model: InventoryModel, page, limit, include: ["product", "user"]
    });

    return { list: rows.map(d => d.dataValues), total: count };
  } catch (error) {
    throw error;
  }
};

export const paginatedListBranchOfficeService = async ({ pagina: page, limite: limit, userId }: PaginatedListServiceProps<Inventory>) => {
  try {
    const { count, rows } = await findAndCountModel({
      where: { userId },
      model: InventoryModel,
      page,
      limit,
      include: [
        {
          model: ProductModel,
          as: "product",
          include: "category"
        },
        "user"
      ]
    });

    return { list: rows.map(d => d.dataValues), total: count };
  } catch (error) {
    throw error;
  }
};

export const updateInventoryService = async (inventory: Partial<Inventory>) => {
  const transaction = await sequelize.startUnmanagedTransaction();
  const addStock = inventory.addStock!;

  try {
    const updateInventoryPromise = incrementModel({
      model: InventoryModel,
      where: { id: inventory.id },
      by: addStock,
      key: "stock",
      transaction
    });


    const updateMovementPromise = createModel({
      model: MovementModel,
      data: {
        inventoryId: inventory.id!,
        userId: inventory.userId!,
        quantity: Math.abs(addStock),
        typeMovement: addStock > 0 ? "Entrada" : "Salida"
      },
      transaction
    });

    await Promise.all([updateInventoryPromise, updateMovementPromise]);

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};