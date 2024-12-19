import InventoryModel from "../models/inventory";
import { Inventory } from "../interfaces/inventory";
import { createModel, findAndCountModel, incrementModel } from "../repositories";
import { PaginatedListServiceProps } from "../types/services";
import ProductModel from "../models/product";
import sequelize from "../sequelize";
import MovementModel from "../models/movement";
import { getClearWhere } from "../utils/functions";
import UserModel from "../models/user";
import { Op } from "@sequelize/core";
import { Product } from "../interfaces/product";
import CategoryModel from "../models/category";

export const paginatedListService = async (
  {
    pagina: page,
    limite: limit,
    userId,
    productName,
    productPartNumber,
    productDescription
  }: PaginatedListServiceProps<Inventory>
) => {
  const where = getClearWhere<Inventory>({ userId });
  const whereProduct = getClearWhere<Product>({
    name: { [Op.iLike]: productName ? `%${productName}%` : "" },
    partNumber: { [Op.iLike]: productPartNumber ? `%${productPartNumber}%` : "" },
    description: { [Op.iLike]: productDescription ? `%${productDescription}%` : "" },
  });

  try {
    const { list, total } = await findAndCountModel({
      model: InventoryModel,
      where,
      page,
      limit,
      include: [
        {
          model: ProductModel,
          as: "product",
          attributes: ["id", "name", "partNumber", "description"],
          where: whereProduct
        },
        {
          model: UserModel,
          as: "user",
          attributes: ["id", "name", "email"]
        }
      ]
    });

    return { list, total };
  } catch (error) {
    throw error;
  }
};

export const paginatedListBranchOfficeService = async ({ pagina: page, limite: limit, ...inventory }: PaginatedListServiceProps<Inventory>) => {
  const { userId, productName, productPartNumber, productDescription } = inventory;
  const where = getClearWhere<Inventory>({ userId });
  const whereProduct = getClearWhere<Product>({
    name: { [Op.iLike]: productName ? `%${productName}%` : "" },
    partNumber: { [Op.iLike]: productPartNumber ? `%${productPartNumber}%` : "" },
    description: { [Op.iLike]: productDescription ? `%${productDescription}%` : "" },
  });

  try {
    const { list, total } = await findAndCountModel({
      where,
      model: InventoryModel,
      page,
      limit,
      include: [
        {
          model: ProductModel,
          as: "product",
          where: whereProduct,
          attributes: ["id", "name", "partNumber", "description"],
          include: {
            model: CategoryModel,
            as: "category",
            attributes: ["id", "name"]
          }
        },
        {
          model: UserModel,
          as: "user",
          attributes: ["id"]
        }
      ]
    });

    return { list, total };
  } catch (error) {
    throw error;
  }
};

export const updateInventoryService = async (inventory: Partial<Inventory>) => {
  const transaction = await sequelize.startUnmanagedTransaction();
  const addStock = inventory.addStock!;
  const userId = global.user?.id!;

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
        userId,
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