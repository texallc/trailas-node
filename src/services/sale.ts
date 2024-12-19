
import { Cart } from "../interfaces/cart";
import { Movement } from "../interfaces/movement";
import { Sale } from "../interfaces/sale";
import { SalesDetail } from "../interfaces/saleDetails";
import InventoryModel from "../models/inventory";
import MovementModel from "../models/movement";
import ProductModel from "../models/product";
import SaleModel from "../models/sale";
import SaleDetailsModel from "../models/saleDetails";
import UserModel from "../models/user";
import { bulkCreate, createModel, findAndCountModel, findOneModel, incrementModel } from "../repositories";
import sequelize from "../sequelize";
import { PaginatedListServiceProps } from "../types/services";
import { getClearWhere } from "../utils/functions";
import { handleErrorFunction } from "../utils/handleError";
import { Lock, Op } from "@sequelize/core";

export const paginatedListService = async ({ pagina: page, limite: limit, ...sale }: PaginatedListServiceProps<Sale>) => {
  const { sellerId, startCreatedAt, endCreatedAt } = sale;
  const where = getClearWhere<Sale>({
    sellerId,
    createdAt: {
      [Op.gte]: startCreatedAt,
      [Op.lte]: endCreatedAt
    }
  });

  try {
    const { list, total } = await findAndCountModel({
      model: SaleModel,
      where,
      page,
      limit,
      distinct: true,
      include: [
        {
          model: UserModel,
          as: "buyer",
          attributes: ["id", "name", "email"],
        },
        {
          model: UserModel,
          as: "seller",
          attributes: ["id", "name", "email"],
        },
        {
          model: SaleDetailsModel,
          as: "details",
          include: {
            model: ProductModel,
            as: "product",
            attributes: ["id", "name", "price", "image", "partNumber"]
          }
        }
      ],
    });

    return { list, total };
  } catch (error) {
    throw handleErrorFunction(error);
  }
};

export const createSaleService = async ({ taxes, discount, subtotal, total, products }: Cart) => {
  const transaction = await sequelize.startUnmanagedTransaction();

  try {
    const userId = global.user?.id!;

    const buyer = await findOneModel({
      model: UserModel,
      where: { email: "sincomprador@trailas.com" },
      transaction
    });

    if (!buyer) {
      throw new Error("Usuario sin comprador no encontrado");
    }

    const newSale = await createModel({
      model: SaleModel,
      data: {
        taxes,
        discount,
        subtotal,
        total,
        sellerId: userId,
        buyerId: buyer.dataValues.id!,
        status: "Normal",
      },
      transaction
    });

    const saleId = newSale.dataValues.id!;

    const createSaleDetailsPromise = bulkCreate({
      model: SaleDetailsModel,
      data: products.map(p => {
        const salesDetail: SalesDetail = {
          saleId,
          productId: p.productId,
          quantity: p.quantity,
          price: p.price
        };

        return salesDetail;
      }),
      transaction
    });

    const movementPromises = products.map(async p => {
      const inventory = (await findOneModel({
        model: InventoryModel,
        where: { productId: p.productId },
        transaction,
        lock: Lock.UPDATE
      }))?.dataValues;

      if (!inventory || !inventory.active) {
        throw new Error(`Inventario del producto: ${p.productId} no encontrado`);
      }

      if (p.quantity > inventory.stock) {
        throw new Error(`Stock insuficiente para el producto: ${p.productId}`);
      }

      const movement: Movement = {
        typeMovement: "Salida",
        quantity: p.quantity,
        userId,
        inventoryId: inventory.id!,
      };

      await incrementModel({
        model: InventoryModel,
        where: { productId: p.productId },
        by: -p.quantity,
        key: "stock",
        transaction
      });

      return movement;
    });

    const createMovementPromise = bulkCreate({
      model: MovementModel,
      data: await Promise.all(movementPromises),
      transaction
    });

    await Promise.all([createSaleDetailsPromise, createMovementPromise]);
    await transaction.commit();

    return newSale;
  } catch (error) {
    await transaction.rollback();
    throw handleErrorFunction(error);
  }
};