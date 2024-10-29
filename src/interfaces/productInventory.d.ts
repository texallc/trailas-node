import InventoryModel from "../models/inventory";
import ProductModel from "../models/product";
import { Inventory } from "./inventory";
import { Product } from "./product";

export interface ProductInventory {
  productId: number;
  inventoryId: number;
}