import { NonAttribute } from "@sequelize/core";
import SaleDetailsModel from "../models/saleDetails";
import UserModel from "../models/user";
import { SaleDetails } from "./saleDetails";
import { User } from "./user";
import { Status } from "../types";

export interface Sale {
  readonly id?: number;
  total: number;
  subtotal: number;
  saleTax: number;
  status: Status;
  buyerId: number;
  buyer: User | NonAttribute<UserModel>;
  sellerId: number;
  seller: User | NonAttribute<UserModel>;
  details: SaleDetails[] | NonAttribute<SaleDetailsModel[]>;
}