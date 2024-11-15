import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute,
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Table, BelongsTo, NotNull } from '@sequelize/core/decorators-legacy';
import { SalesDetail } from '../interfaces/saleDetails';
import SaleModel from './sale';
import ProductModel from './product';

@Table({ tableName: 'sales_detail' })
class SalesDetailModel extends Model<InferAttributes<SalesDetailModel>, InferCreationAttributes<SalesDetailModel>> implements SalesDetail {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id?: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare quantity: number;

  @Attribute(DataTypes.DECIMAL(15, 2))
  @NotNull
  declare price: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare saleId: number;

  @BelongsTo(() => SaleModel, 'saleId')
  declare sale: NonAttribute<SaleModel>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare productId: number;

  @BelongsTo(() => ProductModel, 'productId')
  declare product: NonAttribute<ProductModel>;
}

export default SalesDetailModel;