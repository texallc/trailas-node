import InventoryModel from "../models/inventory";
import ProductModel from "../models/product";
import UserModel from "../models/user";
import { TypeMovement } from "../types";
import { Product } from "./product";
import { UserBranchOffice } from "./userBranchOffice";

export interface Inventory {
  readonly id?: number;
  typeMovement: TypeMovement;
  description: string;
  stock: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  products: Product[] | NonAttribute<ProductModel[]>;
  user: number | User | NonAttribute<UserModel>;
}