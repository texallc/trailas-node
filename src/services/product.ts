
import { Product } from "../interfaces/product";
import { PaginatedListServiceProps } from "../interfaces/userService";
import InventoryModel from "../models/inventory";
import MovementModel from "../models/movement";
import ProductModel from "../models/product";
import ProductInventoryModel from "../models/productInventory";
import TotalTablesModel from "../models/totalTable";
import { createIncrementModel, createModel, findAllModel, findOneModel, updateModel } from "../repositories";
import sequelize from "../sequelize";
import { handleErrorFunction } from "../utils/handleError";

export const paginatedListService = async ({ page, limit }: PaginatedListServiceProps) => {
  try {
    const totalListPromise = findOneModel({ model: TotalTablesModel, where: { tableName: "users" } });
    const listPromise = findAllModel({ model: ProductModel, page, limit });

    const [totalList, list] = await Promise.all([totalListPromise, listPromise]);

    return { list: list.map(d => d.dataValues), total: totalList?.dataValues.total || 0 };
  } catch (error) {
    throw handleErrorFunction(error);
  }
};

export const createProductService = async (product: Product) => {
  const userId = global.user?.id!
  const transaction = await sequelize.startUnmanagedTransaction();

  try {
    const inventoryPromise = createIncrementModel({
      model: InventoryModel,
      data: { stock: product.stock || 0, userId },
      where: { tableName: "inventories" },
      transaction
    })

    const productPromise = createIncrementModel({
      model: ProductModel,
      data: product,
      where: { tableName: "products" },
      transaction
    })

    const [inventoryCreated, productCreated] = await Promise.all([inventoryPromise, productPromise])

    const inventoryId = inventoryCreated.dataValues.id!

    const productInventoryPromise = createModel({
      model: ProductInventoryModel,
      data: { inventoryId, productId: productCreated.dataValues.id! },
      transaction
    })

    const arrayPromise: Promise<unknown>[] = [productInventoryPromise]

    if (product.stock) {
      const movementPromise = createIncrementModel({
        model: MovementModel,
        data: {
          id: 0,
          typeMovement: "Entrada",
          quantity: product.stock || 0,
          inventoryId,
          userId
        },
        where: { tableName: "movements" },
        transaction
      })

      arrayPromise.push(movementPromise)
    }

    await Promise.all(arrayPromise)
    await transaction.commit()
  } catch (error) {
    await transaction.rollback();
    throw handleErrorFunction(error);
  }
}

export const updateProductService = (product: Partial<Product>) =>
  updateModel({ model: ProductModel, data: product, where: { id: product.id } })

export const updateStatusProductService = (id: number, active: boolean) =>
  updateModel({ model: ProductModel, data: { id, active }, where: { id } })