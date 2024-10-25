import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute,
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, HasMany, Table, BelongsTo } from '@sequelize/core/decorators-legacy';
import { Max, Min } from '@sequelize/validator.js';
import { maxPrice, minPrice } from '../constants/constants';
import { Sale } from "../interfaces/sale";
import UserModel from './user';
import SaleDetailsModel from './saleDetails';

@Table({ tableName: 'sales' })
class SaleModel extends Model<InferAttributes<SaleModel>, InferCreationAttributes<SaleModel>> implements Sale {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id?: CreationOptional<number>;

  @Attribute(DataTypes.DECIMAL)
  @Max(maxPrice)
  @Min(minPrice)
  declare total: number;

  @Attribute(DataTypes.DECIMAL)
  @Max(maxPrice)
  @Min(minPrice)
  declare subtotal: number;

  @Attribute(DataTypes.DECIMAL)
  declare sale_tax: number;

  @Attribute(DataTypes.INTEGER)
  declare buyer_id: number;

  @BelongsTo(() => UserModel, 'buyer_id')
  declare buyer: NonAttribute<UserModel>;

  @Attribute(DataTypes.INTEGER)
  declare seller_id: number;

  @BelongsTo(() => UserModel, 'seller_id')
  declare seller: NonAttribute<UserModel>;

  @HasMany(() => SaleDetailsModel, /* foreign key */ 'sale_id')
  declare details?: NonAttribute<SaleDetailsModel[]>;

}

export default SaleModel;