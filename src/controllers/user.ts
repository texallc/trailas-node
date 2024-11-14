import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { createUserService, getByUidService, paginatedListService, updateUserOnlyBdService, updateUserService } from "../services/user";
import { User } from "../interfaces/user";
import { clearSearchQuery } from "../utils/functions";

export const paginatedList: RequestHandler = async (req, res) => {
  try {
    const query = clearSearchQuery<User>(req.query);

    const { list, total } = await paginatedListService(query);

    res.status(200).json({ list, total });
  } catch (error) {
    handleError(res, error);
  }
};

export const getByUid: RequestHandler = async (req, res) => {
  try {
    const { uid } = clearSearchQuery<User>(req.query);

    const user = await getByUidService(uid!);

    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const create: RequestHandler = async (req, res) => {
  try {
    const body = req.body as User;

    const user = await createUserService(body);

    res.status(201).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const body = req.body as User;

    await updateUserService(body);

    res.status(200).json({ message: "Usuario actualizado con exito!" });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateOnlyDb: RequestHandler = async (req, res) => {
  try {
    const body = req.body as User;

    await updateUserOnlyBdService(body);

    res.status(200).json({ message: "Usuario actualizado con exito!" });
  } catch (error) {
    handleError(res, error);
  }
};