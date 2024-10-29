import { NonAttribute } from "@sequelize/core";
import ProductModel from "../models/product";
import { Product } from "./product";
import { Sale } from "./sale";

export interface SaleDetails {
  readonly id?: number;
  quantity: number;
  saleId: number;
  sale: Sale | NonAttribute<SaleModel>;
  productId: number;
  product: Product | NonAttribute<ProductModel>;
}