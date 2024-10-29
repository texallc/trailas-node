import { Response } from "express";
import { User } from "../interfaces/user";

export { };

declare global {
  var user: User | undefined;
};

export type Roles = "Super Admin" | "Administrador de Sucursal" | "Vendedor" | "Comprador";

export type TypeMovement = "Entrada" | "Salida";

export type TableNames = "products" | "users" | "inventories" | "movements" | "categories";

export type NewModelFunction<T> = ((model: T) => T) | null;

export type FunctionController = FunctionController;

export type ReqQuery = Record<string, string>;

export type UndefinedInterface<T> = {
  [K in keyof T]?: T[K] | undefined;
};

export type ModelDefinition<T> = {
  [K in keyof T]-?: SchemaDefinitionProperty<T[K]>;
};