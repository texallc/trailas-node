import { NonAttribute } from '@sequelize/core';
import CategoryModel from "../models/category";
import { Category } from "./category";

export interface Product {
  readonly id?: number;
  uid?: string;
  name: string;
  price: number;
  brand: string;
  unitType: string;
  partNumber: string | null;
  description: string;
  active: boolean;
  image: string;
  category: Category | NonAttribute<CategoryModel>;
  categoryId: number;
  stock?: number;
  inventoryId?: number;
}