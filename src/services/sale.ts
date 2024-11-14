
import { Sale } from "../interfaces/sale";
import SaleModel from "../models/sale";
import { findAndCountModel, updateModel } from "../repositories";
import sequelize from "../sequelize";
import { PaginatedListServiceProps } from "../types/services";
import { handleErrorFunction } from "../utils/handleError";

export const paginatedListService = async ({ pagina: page, limite: limit }: PaginatedListServiceProps<Sale>) => {
  try {
    const { count, rows } = await findAndCountModel({ model: SaleModel, page, limit });

    return { list: rows.map(d => d.dataValues), total: count };
  } catch (error) {
    throw handleErrorFunction(error);
  }
};

export const createSaleService = async (sale: Sale) => {
  const transaction = await sequelize.startUnmanagedTransaction();

  try {


    /* 
  const userId = global.user?.id!;

        const newSale = await createIncrementModel({
      model: SaleModel,
      data: { ...sale, sellerId: userId },
      where: { tableName: "sales" },
      transaction
    });

    const saleId = newSale.dataValues.id!;
    
    const createSaleDetailsPromise = bulkCreateIncrementModel({
      model: SaleDetailsModel,
      data: sale.details.map(d => ({ ...d, saleId })),
      where: { tableName: "saleDetails" },
      transaction
    }); */

    /*  const movmentPromises = sale.details.map(async d => {
       const inventory = (await findByPrimaryKeyModel({
         model: InventoryModel,
         primaryKey: (d.product as Product).inventoryId!,
         transaction,
         lock: Lock.UPDATE
       }))?.dataValues;
 
       if (!inventory) {
         throw new Error(`Inventario del producto: ${d.product.name} no encontrado`);
       }
 
       if (d.quantity > inventory.stock) {
         throw new Error(`Stock insuficiente para el producto: ${d.product.name}`);
       }
 
       const movment: Movement = {
         typeMovement: "Salida",
         quantity: d.quantity,
         userId,
         inventoryId: (d.product as Product).inventoryId!
       };
       return movment;
     });
 
     const createMovementaPromise = bulkCreateIncrementModel({
       model: MovementModel,
       data: await Promise.all(movmentPromises),
       where: { tableName: "movements" },
       transaction
     });
 
     await Promise.all([createSaleDetailsPromise, createMovementaPromise]); */
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw handleErrorFunction(error);
  }
};

export const updateSaleService = async (sale: Partial<Sale>) => {
  const transaction = await sequelize.startUnmanagedTransaction();
  try {
    const updateSale = await updateModel({
      model: SaleModel,
      data: sale,
      where: { id: sale.id },
      transaction
    });
    await transaction.commit();
    return updateSale;
  } catch (error) {
    await transaction.rollback();
    throw handleErrorFunction(error);
  }
};