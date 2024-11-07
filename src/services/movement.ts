import { Movement } from "../interfaces/movement";
import { PaginatedListServiceProps } from "../interfaces/userService";
import MovementModel from "../models/movement";
import TotalTablesModel from "../models/totalTable";
import { createIncrementModel, findAllModel, findOneModel, updateModel } from "../repositories";
import sequelize from "../sequelize";

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
    const newMovement = await createIncrementModel({
      model: MovementModel,
      data: movement,
      where: { tableName: "movements" },
      transaction
    })
    await transaction.commit();
    return newMovement;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}


export const updateMovementService = async (movement: Partial<Movement>) => {
  const transaction = await sequelize.startUnmanagedTransaction();
  try {
    const updateMovement = await updateModel({
      model: MovementModel,
      data: movement,
      where: { id: movement.id },
      transaction
    })
    await transaction.commit();
    return updateMovement;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

// export const updateStatusMovementService = (id: number, active: boolean) =>
// updateModel({ model: MovementModel, data: { id, active }, where: { id } })