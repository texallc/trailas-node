import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, BelongsToMany, Table, NotNull, BelongsTo, HasMany } from '@sequelize/core/decorators-legacy';
import { Max, Min } from '@sequelize/validator.js';
import { maxStock, minStock } from '../constants/constants';
import { Inventory } from '../interfaces/inventory';
import ProductModel from './product';
import UserModel from './user';
import MovementModel from './movement';
import ProductInventoryModel from './productInventory';

@Table({ tableName: 'inventories' })
class InventoryModel extends Model<InferAttributes<InventoryModel>, InferCreationAttributes<InventoryModel>> implements Inventory {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @Max(maxStock)
  @Min(minStock)
  declare stock: number;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare active: boolean;

  @BelongsToMany(() => ProductModel, {
    through: ProductInventoryModel,
    foreignKey: 'inventoryId',
    otherKey: 'productId'
  })
  declare products: NonAttribute<ProductModel[]>;

  @BelongsTo(() => UserModel, 'userId')
  declare user: NonAttribute<UserModel>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;

  @HasMany(() => MovementModel, 'inventoryId')
  declare movements?: NonAttribute<MovementModel[]>;
}

export default InventoryModel;