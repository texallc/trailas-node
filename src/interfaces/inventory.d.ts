import { TypeMovement } from "../types";
import { Product } from "./product";
import { UserBranchOffice } from "./userBranchOffice";

export interface Inventory {
  readonly id?: number;
  product: number | Product;
  userBranchOffice: number | UserBranchOffice;
  typeMovement: TypeMovement;
  description: string;
  stock: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}