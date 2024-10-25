import { Movement } from "../interfaces/movement";
import { PaginatedListServiceProps } from "../interfaces/userService";
import MovementModel from "../models/movement";
import TotalTablesModel from "../models/totalTable";
import { createIncrementModel, findAllModel, findOneModel, updateModel } from "../repositories";

export const paginatedListService = async ({ page, limit }: PaginatedListServiceProps) => {
  try {
    const totalListPromise = findOneModel({ model: TotalTablesModel, where: { tableName: "users" } });
    const listPromise = findAllModel({ model: MovementModel, page, limit });

    const [totalList, list] = await Promise.all([totalListPromise, listPromise]);

    return { list: list.map(d => d.dataValues), total: totalList?.dataValues.total || 0 };
  } catch (error) {
    throw error;
  }
};

export const createMovementService = async (movement: Movement) =>
  createIncrementModel({
    model: MovementModel,
    data: movement,
    where: { tableName: "movements" },
  })

export const updateMovementService = (movement: Partial<Movement>) =>
  updateModel({ model: MovementModel, data: movement, where: { id: movement.id } })

// export const updateStatusMovementService = (id: number, active: boolean) =>
// updateModel({ model: MovementModel, data: { id, active }, where: { id } })