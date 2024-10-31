import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { createUserService, paginatedListService, updateStatusUserService, updateUserService } from "../services/user";
import { getClearQueryString } from "../utils/functions";
import { User } from "../interfaces/user";

export const paginatedList: RequestHandler = async (req, res) => {
  try {
    const { pagina, limite } = getClearQueryString(req.query);

    const { list, total } = await paginatedListService({ page: +pagina, limit: +limite });

    res.status(200).json({ list, total });
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

export const disable: RequestHandler = async (req, res) => {
  try {
    const { id, active } = req.body as { id: number, active: boolean; };

    await updateStatusUserService(id, active);

    res.status(204).end();
  } catch (error) {
    handleError(res, error);
  }
};