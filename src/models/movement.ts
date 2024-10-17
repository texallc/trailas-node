import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement } from '@sequelize/core/decorators-legacy';
import { Movement } from '../interfaces/movement';
import { Inventory } from '../interfaces/inventory';
import { User } from '../interfaces/users';
import { maxStock, minStock } from '../constants/constants';
import { Max, Min } from '@sequelize/validator.js';

class MovementModel extends Model<InferAttributes<MovementModel>, InferCreationAttributes<MovementModel>> implements Omit<Movement, ""> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  declare inventory: number | Inventory;

  @Attribute(DataTypes.INTEGER)
  declare user: number | User;

  @Attribute(DataTypes.INTEGER)
  @Max(maxStock)
  @Min(minStock)
  declare quantity: number;

  @Attribute(DataTypes.DATE)
  declare createdAt: Date;
}

export default MovementModel;