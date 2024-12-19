import { Op } from "@sequelize/core";
import { Movement } from "../interfaces/movement";
import InventoryModel from "../models/inventory";
import MovementModel from "../models/movement";
import ProductModel from "../models/product";
import UserModel from "../models/user";
import { findAndCountModel } from "../repositories";
import { PaginatedListServiceProps } from "../types/services";
import { getClearWhere } from "../utils/functions";
import { Product } from "../interfaces/product";
import { User } from "../interfaces/user";

export const paginatedListService = async ({ pagina: page, limite: limit, ...movement }: PaginatedListServiceProps<Movement>) => {
  const {
    typeMovement,
    productName,
    productPartNumber,
    productDescription,
    branchOfficeId,
    userId,
    startCreatedAt,
    endCreatedAt
  } = movement;

  const where = getClearWhere<Movement>({
    typeMovement,
    userId,
    createdAt: {
      [Op.gte]: startCreatedAt,
      [Op.lte]: endCreatedAt
    }
  });
  const whereProduct = getClearWhere<Product>({
    name: { [Op.iLike]: productName ? `%${productName}%` : "" },
    partNumber: { [Op.iLike]: productPartNumber ? `%${productPartNumber}%` : "" },
    description: { [Op.iLike]: productDescription ? `%${productDescription}%` : "" },
  });
  const whereUser = getClearWhere<User>({
    id: branchOfficeId
  });

  try {
    const { list, total } = await findAndCountModel({
      model: MovementModel,
      where,
      page,
      limit,
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: InventoryModel,
          as: "inventory",
          required: true,
          include: [
            {
              model: ProductModel,
              as: "product",
              attributes: ["id", "name", "partNumber", "description"],
              where: whereProduct,
            },
            {
              model: UserModel,
              as: "user",
              attributes: ["id", "name", "email"],
              where: whereUser
            }
          ]
        }
      ]
    });

    return { list, total };
  } catch (error) {
    throw error;
  }
};