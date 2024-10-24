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
import { maxStock, minStock, typeMovementLength } from '../constants/constants';
import { Len, Max, Min } from '@sequelize/validator.js';
import InventoryModel from './inventory';
import UserModel from './user';
import { TypeMovement } from '../types';

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

  @Attribute(DataTypes.STRING)
  @Len(typeMovementLength)
  declare typeMovement: TypeMovement;
}

export default MovementModel;