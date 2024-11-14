import { Movement } from "../interfaces/movement";
import InventoryModel from "../models/inventory";
import MovementModel from "../models/movement";
import { findAndCountModel } from "../repositories";
import { PaginatedListServiceProps } from "../types/services";

export const paginatedListService = async ({ pagina: page, limite: limit }: PaginatedListServiceProps<Movement>) => {
  try {
    const { count, rows } = await findAndCountModel({
      model: MovementModel,
      page,
      limit,
      include: [
        "user",
        {
          model: InventoryModel,
          as: "inventory",
          include: ["product", "user"]
        },
      ]
    });

    return { list: rows.map(d => d.dataValues), total: count };
  } catch (error) {
    throw error;
  }
};