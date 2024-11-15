import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Table, NotNull, BelongsTo, HasMany } from '@sequelize/core/decorators-legacy';
import { Max, Min } from '@sequelize/validator.js';
import { maxStock, minStock } from '../constants/constants';
import { Inventory } from '../interfaces/inventory';
import ProductModel from './product';
import UserModel from './user';
import MovementModel from './movement';

@Table({ tableName: 'inventories' })
class InventoryModel extends Model<InferAttributes<InventoryModel>, InferCreationAttributes<InventoryModel>> implements Inventory {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id?: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @Max(maxStock)
  @Min(minStock)
  @NotNull
  declare stock: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare productId: number;

  @BelongsTo(() => ProductModel, 'productId')
  declare product: NonAttribute<ProductModel>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;

  @BelongsTo(() => UserModel, 'userId')
  declare user: NonAttribute<UserModel>;

  @HasMany(() => MovementModel, 'inventoryId')
  declare movements?: NonAttribute<MovementModel[]>;
}

export default InventoryModel;