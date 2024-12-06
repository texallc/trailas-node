
import { ModelStatic } from "@sequelize/core";
import { updateImage } from ".";
import { Product } from "../interfaces/product";
import InventoryModel from "../models/inventory";
import MovementModel from "../models/movement";
import ProductModel from "../models/product";
import { createModel, findAndCountModel, updateModel } from "../repositories";
import sequelize from "../sequelize";
import { PaginatedListServiceProps } from "../types/services";
import { handleErrorFunction } from "../utils/handleError";

export const paginatedListService = async ({ pagina: page, limite: limit }: PaginatedListServiceProps<Product>) => {
  try {
    const { count, rows } = await findAndCountModel({
      model: ProductModel,
      page,
      limit,
      include: [
        "category",
        {
          model: InventoryModel,
          as: "inventories",
          include: "user"
        }
      ]
    });

    return { list: rows, total: count };
  } catch (error) {
    throw handleErrorFunction(error);
  }
};

export const createProductService = async (product: Product) => {
  const userAuthId = global.user?.id!;
  const userIds = product.userIds;
  delete product.userIds;

  try {
    await updateImage(product as Required<Product>, ProductModel as ModelStatic, "products");
  } catch (error) {
    throw handleErrorFunction(error);
  }

  const transaction = await sequelize.startUnmanagedTransaction();

  try {
    const newProduct = await createModel({
      model: ProductModel,
      data: product,
      transaction
    });

    if (userIds?.length) {
      const newInventories = await Promise.all(userIds.map(userId => {
        return createModel({
          model: InventoryModel,
          data: { stock: product.stock || 0, userId, productId: newProduct.dataValues.id! },
          transaction
        });
      }));

      if (product.stock) {
        await Promise.all(newInventories.map(({ dataValues: { id } }) => {
          return createModel({
            model: MovementModel,
            data: {
              typeMovement: "Entrada",
              quantity: product.stock!,
              inventoryId: id!,
              userId: userAuthId
            },
            transaction
          });
        }));
      }
    }

    await transaction.commit();

    return newProduct;
  } catch (error) {
    await transaction.rollback();
    throw handleErrorFunction(error);
  }
};

export const updateProductService = async (product: Partial<Product>) => {
  try {
    await updateImage(product as Required<Product>, ProductModel as ModelStatic, "products");
  } catch (error) {
    throw handleErrorFunction(error);
  }

  return updateModel({
    model: ProductModel,
    data: product,
    where: { id: product.id },
  });
};