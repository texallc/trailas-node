import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import CategoryModel from "../models/category";
import InventoryModel from "../models/inventory";
import MovementModel from "../models/movement";
import ProductModel from "../models/product";
import UserModel from "../models/user";
import SaleModel from '../models/sale';
import SaleDetailsModel from '../models/saleDetails';
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT || 5432);
const pathCa = process.env.DB_PATH_CA || "";
const env = process.env.NODE_ENV;

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  user: username,
  password,
  database,
  host,
  port,
  models: [CategoryModel, ProductModel, InventoryModel, MovementModel, UserModel, SaleModel, SaleDetailsModel],
  ssl: env === "dev"
    ? undefined
    : {
      ca: readFileSync(join(__dirname, pathCa)).toString(),
    },
});

export default sequelize;