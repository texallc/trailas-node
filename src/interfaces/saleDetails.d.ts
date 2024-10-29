import ProductModel from "../models/product";

export interface SaleDetails {
  readonly id?: number;
  quantity: number;
  saleId: number;
  sale: Sale | NonAttribute<SaleModel>;
  productId: number;
  product: Product | NonAttribute<ProductModel>;
}