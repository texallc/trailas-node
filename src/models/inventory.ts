import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, BelongsToMany, Table, NotNull, BelongsTo, HasMany } from '@sequelize/core/decorators-legacy';
import { Len, Max, Min } from '@sequelize/validator.js';
import { maxStock, minStock, stringLargeLength, typeMovementLength } from '../constants/constants';
import { Inventory } from '../interfaces/inventory';
import ProductModel from './product';
import UserModel from './user';
import { TypeMovement } from '../types';
import MovementModel from './movement';
import ProductInventoryModel from './productInventory';

@Table({ tableName: 'inventories' })
class InventoryModel extends Model<InferAttributes<InventoryModel>, InferCreationAttributes<InventoryModel>> implements Inventory {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @Len(stringLargeLength)
  declare description: string;

  @Attribute(DataTypes.STRING)
  @Len(typeMovementLength)
  declare typeMovement: TypeMovement;

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

  @BelongsToMany(() => ProductModel, {
    through: ProductInventoryModel,
  })
  declare products: NonAttribute<ProductModel[]>

  @BelongsTo(() => UserModel, 'userId')
  declare user: NonAttribute<UserModel>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;

  @HasMany(() => MovementModel, /* foreign key */ 'inventoryId')
  declare movements?: NonAttribute<MovementModel[]>;
}

export default InventoryModel;