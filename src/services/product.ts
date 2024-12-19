
import { Model, ModelStatic, Op } from "@sequelize/core";
import { updateImage } from ".";
import { Product } from "../interfaces/product";
import InventoryModel from "../models/inventory";
import MovementModel from "../models/movement";
import ProductModel from "../models/product";
import { createModel, findAndCountModel, findOrCreateModel, updateModel } from "../repositories";
import sequelize from "../sequelize";
import { PaginatedListServiceProps } from "../types/services";
import { handleErrorFunction } from "../utils/handleError";
import CategoryModel from "../models/category";
import UserModel from "../models/user";
import { getClearWhere } from "../utils/functions";
import { Inventory } from "../interfaces/inventory";

export const paginatedListService = async ({ pagina: page, limite: limit, ...product }: PaginatedListServiceProps<Product>) => {
  const { name, partNumber, description, categoryId } = product;
  const where = getClearWhere<Product>({
    name: { [Op.iLike]: name ? `%${name}%` : "" },
    partNumber: { [Op.iLike]: partNumber ? `%${partNumber}%` : "" },
    description: { [Op.iLike]: description ? `%${description}%` : "" },
    categoryId
  });

  try {
    const { list, total } = await findAndCountModel({
      model: ProductModel,
      where,
      page,
      limit,
      include: [
        {
          model: CategoryModel,
          as: "category",
          attributes: ["id", "name"]
        },
        {
          model: InventoryModel,
          attributes: ["id", "userId"],
          as: "inventories",
          where: { active: true },
          include: {
            model: UserModel,
            as: "user",
            attributes: ["id", "name"]
          }
        }
      ]
    });

    return { list, total };
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
          data: { stock: product.stock || 0, userId, productId: newProduct.dataValues.id!, active: true },
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

  const transaction = await sequelize.startUnmanagedTransaction();
  const { id, userIds } = product;

  try {
    const promiseUpdateProduct = updateModel({
      model: ProductModel,
      where: { id },
      data: product,
      transaction
    });

    const promiseDefuseInventories = updateModel({
      model: InventoryModel,
      where: { productId: id },
      data: { active: false },
      transaction
    });

    const promiseActivateInventories = updateModel({
      model: InventoryModel,
      where: {
        productId: id,
        userId: userIds
      },
      data: { active: true },
      transaction
    });

    const [productUpdated] = await Promise.all([promiseDefuseInventories, promiseActivateInventories, promiseUpdateProduct]);

    await Promise.all(
      userIds!.map(userId => {
        findOrCreateModel<Inventory>({
          model: InventoryModel as unknown as ModelStatic<Model<Inventory, Inventory>>,
          where: { productId: id!, userId },
          data: {
            productId: id!,
            userId,
            stock: 0,
            active: true,
          },
          transaction
        });
      })
    );

    await transaction.commit();

    return productUpdated;
  } catch (error) {
    await transaction.rollback();
    throw handleErrorFunction(error);
  }
};