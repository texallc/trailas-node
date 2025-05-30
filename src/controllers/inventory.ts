import { RequestHandler } from "express";
import handleError from "../utils/handleError";
import { clearSearchQuery } from "../utils/functions";
import { paginatedListBranchOfficeService, paginatedListService, updateInventoryService } from "../services/inventory";
import { Inventory } from "../interfaces/inventory";

export const paginatedList: RequestHandler = async (req, res) => {
  try {
    const query = clearSearchQuery<Inventory>(req.query, ["userId", "productName", "productPartNumber", "productDescription"]);

    const { list, total } = await paginatedListService(query);

    res.status(200).json({ list, total });
  } catch (error) {
    handleError(res, error);
  }
};

export const paginatedListBranchOffice: RequestHandler = async (req, res) => {
  try {
    const query = clearSearchQuery<Inventory>(req.query, ["userId", "productName", "productPartNumber", "productDescription"]);

    if (!query.userId) {
      res.status(400).json({ message: "La sucursal es requerida." });
      return;
    };

    const user = global.user!;

    if (user.role === "Administrador de Sucursal" && query.userId !== user.id) {
      res.status(403).json({ message: "No tienes permisos para acceder a esta sucursal." });
      return;
    }

    const { list, total } = await paginatedListBranchOfficeService(query);

    res.status(200).json({ list, total });
  } catch (error) {
    handleError(res, error);
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const body = req.body as Partial<Inventory>;

    await updateInventoryService(body);

    res.status(200).json({ message: "Inventario actualizado." });
  } catch (error) {
    handleError(res, error);
  }
};