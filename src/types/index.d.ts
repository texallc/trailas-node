
import { User } from "../interfaces/user";

export { };

declare global {
  var user: User | undefined;
}

export type Roles = "Super Admin" | "Administrador de Sucursal" | "Vendedor" | "Comprador";

export type TypeMovement = "Entrada" | "Salida";

export type TableNames = "products" | "users" | "inventories" | "movements" | "categories" | "sales" | "saleDetails";

export type Status = "Normal" | "Cancelada";

export type TypeUnit = "Pza" | "Kg" | "L" | "m" | "m2" | "Gal" | "ml" | "g" | "m3" | "Pqt" | "Caja" | "Juego";

export type NewModelFunction<T> = ((model: T) => T) | null;

export type ReqQuery = Record<string, string>;

export type UndefinedInterface<T> = {
  [K in keyof T]?: T[K] | undefined;
};
