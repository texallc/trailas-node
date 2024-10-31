import { PaginatedListServiceProps } from "../interfaces/userService";
import TotalTablesModel from "../models/totalTable";
import { createIncrementModel, findAllModel, findOneModel, updateModel } from "../repositories";
import UserModel from "../models/user";
import { User } from "../interfaces/user";
import { createUserAuth, deleteUserAuth, updateUserAuth } from "../repositories/firebaseAuth";
import { handleErrorFunction } from "../utils/handleError";
import sequelize from "../sequelize";

export const paginatedListService = async ({ page, limit }: PaginatedListServiceProps) => {
  try {
    const totalListPromise = findOneModel({ model: TotalTablesModel, where: { tableName: "users" } });
    const listPromise = findAllModel({ model: UserModel, page, limit });

    const [totalList, list] = await Promise.all([totalListPromise, listPromise]);

    return { list: list.map(d => d.dataValues), total: totalList?.dataValues.total || 0 };
  } catch (error) {
    throw error;
  }
};

export const createUserService = async (user: User) => {
  let uid: string = "";
  try {
    const { uid: _uid } = await createUserAuth({ email: user.email, password: user.password });
    uid = _uid;
  } catch (error) {
    throw handleErrorFunction(error);
  }

  try {
    await createIncrementModel({
      model: UserModel,
      data: { ...user, uid },
      where: { tableName: "users" },
    });
  } catch (error) {
    if (uid) {
      deleteUserAuth(uid);
    }
    throw handleErrorFunction(error);
  }
}

export const updateUserService = async (user: User) => {
  const transaction = await sequelize.startUnmanagedTransaction();
  try {
    await updateModel({ model: UserModel, data: user, where: { id: user.id }, transaction });
    await updateUserAuth(user.uid, { email: user.email });

    await transaction.commit()
  } catch (error) {
    await transaction.rollback();
    throw handleErrorFunction(error);
  }
}

export const updateStatusUserService = (id: number, active: boolean) =>
  updateModel({ model: UserModel, data: { id, active }, where: { id } });