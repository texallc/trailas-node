import { Response } from "express";

export { };

/* declare global {
  var user: Users | undefined;
}; */

export type Roles = "SuperAdministrador" | "Administrador" | "Comprador";

export type TypeMovement = "Entrada" | "Salida";

export type NewModelFunction<T> = ((model: T) => T) | null;

export type FunctionController = FunctionController;

export type ReqQuery = Record<string, string>;

export type UndefinedInterface<T> = {
  [K in keyof T]?: T[K] | undefined;
};

export type ModelDefinition<T> = {
  [K in keyof T]-?: SchemaDefinitionProperty<T[K]>;
};