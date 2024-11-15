import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute,
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, HasMany, Table, BelongsTo, NotNull } from '@sequelize/core/decorators-legacy';
import { Max, Min } from '@sequelize/validator.js';
import { maxPrice, minPrice } from '../constants/constants';
import { Sale } from "../interfaces/sale";
import UserModel from './user';
import SaleDetailsModel from './saleDetails';
import { Status } from '../types';

@Table({ tableName: 'sales' })
class SaleModel extends Model<InferAttributes<SaleModel>, InferCreationAttributes<SaleModel>> implements Sale {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id?: CreationOptional<number>;

  @Attribute(DataTypes.DECIMAL)
  @Max(maxPrice)
  @Min(minPrice)
  @NotNull
  declare total: number;

  @Attribute(DataTypes.DECIMAL)
  @Max(maxPrice)
  @Min(minPrice)
  @NotNull
  declare subtotal: number;

  @Attribute(DataTypes.DECIMAL)
  declare taxes: number;

  @Attribute(DataTypes.DECIMAL)
  declare discount: number;

  @Attribute(DataTypes.STRING)
  declare status: Status;

  @BelongsTo(() => UserModel, 'buyerId')
  declare buyer: NonAttribute<UserModel>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare buyerId: number;

  @BelongsTo(() => UserModel, 'sellerId')
  declare seller: NonAttribute<UserModel>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare sellerId: number;

  @HasMany(() => SaleDetailsModel, 'saleId')
  declare details: NonAttribute<SaleDetailsModel[]>;
}

export default SaleModel;