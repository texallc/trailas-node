import { NonAttribute } from '@sequelize/core';
import InventoryModel from "../models/inventory";
import ProductModel from "../models/product";
import UserModel from "../models/user";
import { TypeMovement } from "../types";
import { Inventory } from "./inventory";
import { Product } from "./product";
import { User } from "./user";

export interface Movement {
  readonly id?: number;
  quantity: number;
  createdAt?: Date;
  inventory?: Inventory | NonAttribute<InventoryModel>;
  inventoryId: number;
  user?: User | NonAttribute<UserModel>;
  userId: number;
  typeMovement: TypeMovement;
}