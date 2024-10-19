import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { paginatedListService } from "../services/user";

export const paginatedList: RequestHandler = async (req, res) => {
  try {
    const { page, limit } = req.query;

    //meter logica en funcion
    if (!page || typeof page !== "string") throw new Error("Formato de pagina incorrecto");

    if (!limit || typeof limit !== "string") throw new Error("Formato de limite incorrecto");

    const { list, total } = await paginatedListService({ page: +page, limit: +limit });

    res.status(200).json({ list, total });
  } catch (error) {
    handleError(res, error);
  }
};