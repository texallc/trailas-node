import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { paginatedListService } from "../services/user";
import { getClearQueryString } from "../utils/functions";

export const paginatedList: RequestHandler = async (req, res) => {
  try {
    const { page, limit } = getClearQueryString(req.query);

    const { list, total } = await paginatedListService({ page: +page, limit: +limit });

    res.status(200).json({ list, total });
  } catch (error) {
    handleError(res, error);
  }
};