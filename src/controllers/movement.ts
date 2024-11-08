import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { getClearQueryString } from "../utils/functions";
import { createMovementService, paginatedListService, updateMovementService } from "../services/movement";
import { Movement } from "../interfaces/movement";

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
    const body = req.body as Movement;

    const movement = await createMovementService(body);

    res.status(201).json(movement);
  } catch (error) {
    handleError(res, error);
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const body = req.body as Partial<Movement>;

    const movement = await updateMovementService(body);

    res.status(200).json(movement);
  } catch (error) {
    handleError(res, error);
  }
};