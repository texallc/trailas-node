import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute,
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Table, BelongsTo } from '@sequelize/core/decorators-legacy';
import { SaleDetails } from '../interfaces/saleDetails';
import SaleModel from './sale';
import ProductModel from './product';

@Table({ tableName: 'sales_details' })
class SaleDetailsModel extends Model<InferAttributes<SaleDetailsModel>, InferCreationAttributes<SaleDetailsModel>> implements SaleDetails {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id?: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  declare quantity: number;

  @Attribute(DataTypes.INTEGER)
  declare saleId: number;

  @BelongsTo(() => SaleModel, 'saleId')
  declare sale: NonAttribute<SaleModel>;

  @Attribute(DataTypes.INTEGER)
  declare productId: number;

  @BelongsTo(() => ProductModel, 'productId')
  declare product: NonAttribute<ProductModel>;
}

export default SaleDetailsModel;