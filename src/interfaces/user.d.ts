import { NonAttribute, OpTypes, Where } from '@sequelize/core';
import InventoryModel from "../models/inventory";
import MovementModel from "../models/movement";
import SaleModel from "../models/sale";
import { Roles } from "../types";
import { Inventory } from "./inventory";
import { Movement } from "./movement";
import { Sale } from "./sale";

export interface User {
  readonly id?: number;
  uid: string;
  readonly role: Roles;
  name: string;
  email: string;
  description: string;
  active: boolean;
  image: string;
  password?: string;
  rfc: string;
  phone: string;
  inventories?: Inventory[] | NonAttribute<InventoryModel[]>;
  movements?: Movement[] | NonAttribute<MovementModel[]>;
  salesSeller?: Sale[] | NonAttribute<SaleModel[]>;
  salesBuyer?: Sale[] | NonAttribute<SaleModel[]>;
}

export interface UserQuery extends Omit<User, "role"> {
  role: Roles | Roles[];
}