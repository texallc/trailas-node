import { PaginatedListServiceProps } from "../interfaces/userService";
import TotalTablesModel from "../models/totalTable";
import { createIncrementModel, findAllModel, findOneModel, updateModel } from "../repositories";
import UserModel from "../models/user";
import { User } from "../interfaces/user";

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

export const createUserService = (user: User) =>
  createIncrementModel({
    model: UserModel,
    data: user,
    where: { tableName: "users" },
  });

export const updateUserService = (user: User) =>
  updateModel({ model: UserModel, data: user, where: { id: user.id } });

export const updateStatusUserService = (id: number, active: boolean) =>
  updateModel({ model: UserModel, data: { id, active }, where: { id } });