import UserModel from "../models/user";

export interface Sale {
  readonly id?: number;
  total: number;
  subtotal: number;
  sale_tax: number;
  buyer_id: number;
  buyer: User | NonAttribute<UserModel>;
  seller_id: number;
  seller: User | NonAttribute<UserModel>;
  details?: SaleDetails[] | NonAttribute<SaleDetailsModel[]>;
}