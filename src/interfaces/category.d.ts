import { NonAttribute } from '@sequelize/core';
import ProductModel from "../models/product";
import { Product } from "./product";

export interface Category {
  readonly id?: number;
  name: string;
  description: string;
  image: string;
  active: boolean;
  products?: Product[] | NonAttribute<ProductModel[]>;
}