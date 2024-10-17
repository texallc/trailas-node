import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default } from '@sequelize/core/decorators-legacy';
import { Len, Max, Min } from '@sequelize/validator.js';
import { maxStock, minStock, stringLargeLength } from '../constants/constants';
import { Inventory } from '../interfaces/inventory';
import { Product } from '../interfaces/product';
import { UserBranchOffice } from '../interfaces/userBranchOffice';

class InventoryModel extends Model<InferAttributes<InventoryModel>, InferCreationAttributes<InventoryModel>> implements Omit<Inventory, 'typeMovement'> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  declare product: number | Product;

  @Attribute(DataTypes.INTEGER)
  declare userBranchOffice: number | UserBranchOffice;

  @Attribute(DataTypes.STRING)
  @Len(stringLargeLength)
  declare description: string;

  @Attribute(DataTypes.INTEGER)
  @Max(maxStock)
  @Min(minStock)
  declare stock: number;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare active: boolean;

  @Attribute(DataTypes.DATE)
  declare createdAt: Date;

  @Attribute(DataTypes.DATE)
  declare updatedAt: Date;
}

export default InventoryModel;