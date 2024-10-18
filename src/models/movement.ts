import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Table, BelongsTo, NotNull } from '@sequelize/core/decorators-legacy';
import { Movement } from '../interfaces/movement';
import { maxStock, minStock } from '../constants/constants';
import { Max, Min } from '@sequelize/validator.js';
import InventoryModel from './inventory';
import UserModel from './user';

@Table({ tableName: 'movements' })
class MovementModel extends Model<InferAttributes<MovementModel>, InferCreationAttributes<MovementModel>> implements Movement {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @Max(maxStock)
  @Min(minStock)
  declare quantity: number;

  @Attribute(DataTypes.DATE)
  declare createdAt: Date;

  @BelongsTo(() => InventoryModel, 'inventoryId')
  declare inventory: NonAttribute<InventoryModel>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare inventoryId: number;

  @BelongsTo(() => UserModel, 'userId')
  declare user: NonAttribute<UserModel>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;
}

export default MovementModel;