import { Roles } from "../types";

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
  phone: number;
  role: Roles;
  inventories?: Inventory[] | NonAttribute<InventoryModel[]>;
  movements?: Movement[] | NonAttribute<MovementModel[]>;
  salesSeller?: Sale[] | NonAttribute<SaleModel[]>;
  salesBuyer?: Sale[] | NonAttribute<SaleModel[]>;
}
