import { Movement } from "../interfaces/movement";
import { PaginatedListServiceProps } from "../interfaces/userService";
import MovementModel from "../models/movement";
import TotalTablesModel from "../models/totalTable";
import { createModel, findAllModel, findOneModel, incrementModel, updateModel } from "../repositories";
import sequelize from "../sequelize";
import { handleErrorFunction } from "../utils/handleError";

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

export const createMovementService = async (movement: Movement) => {
  const transaction = await sequelize.startUnmanagedTransaction();

  try {
    const movementPromise = createModel({ model: MovementModel, data: { ...movement, id: 0 }, transaction })
    const totalTablesPromise = incrementModel({ model: TotalTablesModel, where: { tableName: "movements" }, key: "total", transaction })

    await Promise.all([movementPromise, totalTablesPromise])
  } catch (error) {
    transaction.rollback();
    throw handleErrorFunction(error);
  }
}

export const updateMovementService = (movement: Partial<Movement>) =>
  updateModel({ model: MovementModel, data: movement, where: { id: movement.id } })

// export const updateStatusMovementService = (id: number, active: boolean) =>
// updateModel({ model: MovementModel, data: { id, active }, where: { id } })