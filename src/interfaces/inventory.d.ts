import { NonAttribute } from '@sequelize/core';
import ProductModel from "../models/product";
import UserModel from "../models/user";
import { Product } from "./product";
import { User } from "./user";

export interface Inventory {
  readonly id?: number;
  stock: number;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  products: Product[] | NonAttribute<ProductModel[]>;
  user: User | NonAttribute<UserModel>;
  userId: number;
}