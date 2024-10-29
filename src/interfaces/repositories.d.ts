import { FindAttributeOptions, ModelStatic, Model, WhereOptions, Includeable, Order, Transaction } from "@sequelize/core";
import { User } from "./user";
import TotalTablesModel from "../models/totalTable";
import { TotalTables } from "./totalTables";

export interface PropsCreateModel<T> {
  model: ModelStatic<Model<T, T>>;
  data: T;
  transaction?: Transaction;
}

export interface PropsUpdateModel<T> {
  model: ModelStatic<Model<T, T>>;
  data: Partial<T>;
  where: WhereOptions<T>;
  transaction?: Transaction;
}

export interface PropsFindOneModel<T> {
  model: ModelStatic<Model<T, T>>;
  attributes?: FindAttributeOptions<T> | (keyof T)[];
  where?: WhereOptions<T>;
  include?: Includeable | Includeable[];
}

export interface PropsGetAllModel<T> {
  model: ModelStatic<Model<T, T>>;
  attributes?: FindAttributeOptions<T> | (keyof T)[];
  where?: WhereOptions<T>;
  include?: Includeable | Includeable[];
  order?: Order;
  limit?: number;
  page?: number;
};

export interface PropsBulkCreate<T> {
  model: ModelStatic<Model<T, T>>;
  data: T[] | Partial<T>[];
  updateOnDuplicate?: (keyof T)[];
  transaction?: Transaction;
};

export interface PropsDeleteModel<T> {
  model: ModelStatic<Model<T, T>>,
  where: WhereOptions<T>;
  transaction?: Transaction;
};

export interface PropsIncrementModel {
  where: Partial<TotalTables>;
  transaction?: Transaction;
  by?: number;
}
