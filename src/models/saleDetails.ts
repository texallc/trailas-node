import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute,
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Table, BelongsTo, NotNull } from '@sequelize/core/decorators-legacy';
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
  @NotNull
  declare quantity: number;

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

export default SaleDetailsModel;