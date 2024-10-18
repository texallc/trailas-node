import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import CategoryModel from "../models/category";
import InventoryModel from "../models/inventory";
import MovementModel from "../models/movement";
import ProductModel from "../models/product";
import ProductInventory from "../models/productInventory";
import UserModel from "../models/user";

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: 'trailas',
  user: 'postgres',
  password: '12345678',
  host: 'localhost',
  port: 5432,

  models: [CategoryModel, ProductModel, InventoryModel, ProductInventory, MovementModel, UserModel],
});

export default sequelize;