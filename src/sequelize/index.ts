import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import CategoryModel from "../models/category";
import InventoryModel from "../models/inventory";
import MovementModel from "../models/movement";
import ProductModel from "../models/product";
import ProductInventory from "../models/productInventory";
import UserModel from "../models/user";
import TotalTablesModel from "../models/totalTable";
import SaleModel from '../models/sale';
import SaleDetailsModel from '../models/saleDetails';

const port = Number(process.env.DB_PORT || 5432);
const password = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: 'trailas',
  user: 'postgres',
  password,
  host: 'localhost',
  port,

  models: [CategoryModel, ProductModel, InventoryModel, ProductInventory, MovementModel, UserModel, TotalTablesModel, SaleModel, SaleDetailsModel],
});

export default sequelize;