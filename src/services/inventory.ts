import InventoryModel from "../models/inventory";
import { Inventory } from "../interfaces/inventory";
import { findAndCountModel, updateModel } from "../repositories";
import { PaginatedListServiceProps } from "../types/services";
import ProductModel from "../models/product";

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

export const updateInventoryService = async (inventory: Partial<Inventory>) => updateModel({
  model: InventoryModel,
  data: inventory,
  where: { id: inventory.id },
});
