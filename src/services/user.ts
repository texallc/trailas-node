import { createModel, findAndCountModel, findOneModel, updateModel } from "../repositories";
import UserModel from "../models/user";
import { User } from "../interfaces/user";
import { createUserAuth, deleteUserAuth, getUserAuthByUid, updateUserAuth } from "../repositories/firebaseAuth";
import { handleErrorFunction } from "../utils/handleError";
import sequelize from "../sequelize";
import { PaginatedListServiceProps } from "../types/services";
import { getClearWhere } from "../utils/functions";
import { updateImage } from ".";
import { ModelStatic } from "@sequelize/core";

export const paginatedListService = async ({ pagina: page, limite: limit, ...query }: PaginatedListServiceProps<User>) => {
  try {
    const where = getClearWhere(query);

    const { count, rows } = await findAndCountModel({ model: UserModel, where, page, limit });

    return { list: rows.map(d => d.dataValues), total: count };
  } catch (error) {
    throw error;
  }
};

export const getByUidService = async (uid: string) => {
  try {
    const user = await findOneModel({ model: UserModel, where: { uid } });

    return user?.dataValues;
  } catch (error) {
    throw handleErrorFunction(error);
  }
};

export const createUserService = async (user: User) => {
  let uid: string = "";

  try {
    await updateImage(user as Required<User>, UserModel as ModelStatic);
  } catch (error) {
    throw handleErrorFunction(error);
  }

  try {
    const { uid: _uid } = await createUserAuth({ email: user.email, password: user.password, displayName: user.role });

    uid = _uid;
  } catch (error) {
    throw handleErrorFunction(error);
  }

  try {
    const newUser = await createModel({
      model: UserModel,
      data: { ...user, uid },
    });

    return newUser.dataValues;
  } catch (error) {
    if (uid) {
      deleteUserAuth(uid);
    }

    throw handleErrorFunction(error);
  }
};

export const updateUserService = async (user: Partial<User>) => {
  let { id, email, password, uid } = user;

  try {
    await updateImage(user as Required<User>, UserModel as ModelStatic);
  } catch (error) {
    throw handleErrorFunction(error);
  }

  const transaction = await sequelize.startUnmanagedTransaction();

  try {
    const userAuthPromise = getUserAuthByUid(uid!);
    const updateModelPromise = updateModel({ model: UserModel, data: user, where: { id }, transaction });

    const [userAuth] = await Promise.all([userAuthPromise, updateModelPromise]);

    if (userAuth.email !== email || password) {
      await updateUserAuth(uid!, password ? { email, password } : { email });
    }

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw handleErrorFunction(error);
  }
};

export const updateUserOnlyBdService = async (user: Partial<User>) => {
  const { id } = user;

  try {
    await updateModel({ model: UserModel, data: user, where: { id } });
  } catch (error) {
    throw handleErrorFunction(error);
  }
};