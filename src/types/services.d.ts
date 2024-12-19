import { FindAttributeOptions } from "@sequelize/core";

export type PaginatedListServiceProps<T extends {}> = Partial<T> & {
  pagina: number;
  limite: number;
  attributes?: FindAttributeOptions<T> | (keyof T)[] | undefined;
};