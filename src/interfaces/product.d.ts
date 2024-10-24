import CategoryModel from "../models/category";
import { Category } from "./category";
import {
  NonAttribute
} from '@sequelize/core';

export interface Product {
  readonly id?: number;
  uid?: string;
  name: string;
  price: number;
  brand: string;
  unitType: string;
  partNumber: string;
  description: string;
  active: boolean;
  image: string;
  category: Category | NonAttribute<CategoryModel>;
  categoryId: number;
  stock?: number;
}