import { Inventory } from "./inventory";
import { User } from "./users";

export interface Movement {
  inventory: number | Inventory;
  user: number | User;
  quantity: number;
  createdAt: Date;
}