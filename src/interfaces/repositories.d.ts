import { FindAttributeOptions, ModelStatic, Model, WhereOptions, Includeable, Order, Transaction, Lock } from "@sequelize/core";

export interface PropsCreateModel<T extends {}> {
  model: ModelStatic<Model<T, T>>;
  data: T;
  where?: WhereOptions<T>;
  transaction?: Transaction;
}

export interface PropsUpdateModel<T extends {}> {
  model: ModelStatic<Model<T, T>>;
  data: Partial<T>;
  where: WhereOptions<T>;
  transaction?: Transaction;
}

export interface PropsFindOneModel<T extends {}> {
  model: ModelStatic<Model<T, T>>;
  attributes?: FindAttributeOptions<T> | (keyof T)[];
  where?: WhereOptions<T>;
  include?: Includeable | Includeable[];
  transaction?: Transaction;
  lock?: Lock | { level: Lock; of: ModelStatic<Model>; } | boolean;
}

export interface PropsFindByPrimaryKeyModel<T extends {}> {
  model: ModelStatic<Model<T, T>>;
  attributes?: (keyof T)[];
  primaryKey: number;
  include?: Includeable | Includeable[];
  lock?: Lock | { level: Lock; of: ModelStatic<Model>; } | boolean;
  transaction?: Transaction;
}

export interface PropsGetAllModel<T extends {}> {
  model: ModelStatic<Model<T, T>>;
  attributes?: FindAttributeOptions<T> | (keyof T)[];
  where?: WhereOptions<T>;
  include?: Includeable | Includeable[];
  order?: Order;
  limit?: number;
  page?: number;
  distinct?: boolean;
}

export interface PropsBulkCreate<T extends {}> {
  model: ModelStatic<Model<T, T>>;
  data: T[] | Partial<T>[];
  updateOnDuplicate?: (keyof T)[];
  transaction?: Transaction;
}

export interface PropsDeleteModel<T extends {}> {
  model: ModelStatic<Model<T, T>>,
  where: WhereOptions<T>;
  transaction?: Transaction;
}

export interface PropsIncrementModel<T extends {}> {
  model: ModelStatic<Model<T, T>>,
  where: WhereOptions<T>;
  by: number;
  key: keyof T;
  transaction?: Transaction;
}