import ProductModel from "../models/product";

export interface SaleDetails {
  readonly id?: number;
  quantity: number;
  sale_id: number;
  sale: Sale | NonAttribute<SaleModel>;
  product_id: number;
  product: Product | NonAttribute<ProductModel>;
}