import { NonAttribute } from "@sequelize/core";
import ProductModel from "../models/product";
import SaleModel from "../models/sale";
import { Product } from "./product";
import { Sale } from "./sale";

export interface SalesDetail {
  readonly id?: number;
  quantity: number;
  price: number;
  saleId: number;
  sale?: Sale | NonAttribute<SaleModel>;
  productId: number;
  product?: Product | NonAttribute<ProductModel>;
}