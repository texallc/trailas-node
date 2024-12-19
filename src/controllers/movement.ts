import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { clearSearchQuery } from "../utils/functions";
import { paginatedListService } from "../services/movement";
import { Movement } from "../interfaces/movement";

export const paginatedList: RequestHandler = async (req, res) => {
  try {
    const query = clearSearchQuery<Movement>(
      req.query,
      [
        "productName",
        "productPartNumber",
        "productDescription",
        "typeMovement",
        "branchOfficeId",
        "userId",
        "startCreatedAt",
        "endCreatedAt"
      ]
    );

    const { list, total } = await paginatedListService(query);

    res.status(200).json({ list, total });
  } catch (error) {
    handleError(res, error);
  }
};