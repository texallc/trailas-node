import { NonAttribute } from '@sequelize/core';
import InventoryModel from "../models/inventory";
import UserModel from "../models/user";
import { TypeMovement } from "../types";
import { Inventory } from "./inventory";
import { User } from "./user";
import { QueryDates } from ".";

export interface Movement extends QueryDates {
  readonly id?: number;
  quantity: number;
  createdAt?: Date;
  inventory?: Inventory | NonAttribute<InventoryModel>;
  inventoryId: number;
  user?: User | NonAttribute<UserModel>;
  userId: number;
  typeMovement: TypeMovement;
  productName?: string;
  productPartNumber?: string;
  productDescription?: string;
  branchOfficeId?: number;
}