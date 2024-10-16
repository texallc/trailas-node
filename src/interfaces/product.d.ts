
export interface Product {
  readonly id?: number;
  uid?: string;
  name: string;
  price: number;
  brand: string;
  unitType: string;
  category: string;
  partNumber: string;
  description?: string;
  active: boolean;
  image?: string;
}