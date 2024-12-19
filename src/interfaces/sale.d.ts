import { NonAttribute } from "@sequelize/core";
import SaleDetailsModel from "../models/saleDetails";
import UserModel from "../models/user";
import { SalesDetail } from "./saleDetails";
import { User } from "./user";
import { Status } from "../types";
import { QueryDates } from ".";

export interface Sale extends QueryDates {
  readonly id?: number;
  total: number;
  subtotal: number;
  taxes: number;
  discount: number;
  status: Status;
  buyerId: number;
  buyer: User | NonAttribute<UserModel>;
  sellerId: number;
  seller: User | NonAttribute<UserModel>;
  details: SalesDetail[] | NonAttribute<SaleDetailsModel[]>;
}