import { TableNames } from "../types";

export interface TotalTables {
  readonly id?: number;
  tableName: TableNames;
  total: number;
}