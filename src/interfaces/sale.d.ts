import UserModel from "../models/user";

export interface Sale {
  readonly id?: number;
  total: number;
  subtotal: number;
  saleTax: number;
  buyerId: number;
  buyer: User | NonAttribute<UserModel>;
  sellerId: number;
  seller: User | NonAttribute<UserModel>;
  details?: SaleDetails[] | NonAttribute<SaleDetailsModel[]>;
}