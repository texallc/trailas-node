import { Inventory } from "./inventory";
import { User } from "./users";

export interface Movement {
  readonly id: number;
  inventory: number | Inventory;
  user: number | User;
  quantity: number;
  createdAt: Date;
}