import UserModel from "../models/user";
import { Inventory } from "./inventory";
import { User } from "./users";

export interface Movement {
  readonly id: number;
  quantity: number;
  createdAt: Date;
  inventory: Inventory | NonAttribute<InventoryModel>;
  user: User | NonAttribute<UserModel>;
  inventoryId: number;
  userId: number;
}