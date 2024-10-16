import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default } from '@sequelize/core/decorators-legacy';
import { Len, Max, Min } from '@sequelize/validator.js';
import { Product } from '../interfaces/product';
import { maxPrice, minPrice, stringLargeLength, stringLength } from '../constants/constants';

class ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> implements Product {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  declare name: string;

  @Attribute(DataTypes.STRING)
  @Len(stringLargeLength)
  declare description: string;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  declare image: string;

  @Attribute(DataTypes.DECIMAL(15, 2))
  @Max(maxPrice)
  @Min(minPrice)
  declare price: number;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  declare brand: string;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  declare partNumber: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare active: boolean;

  @Attribute(DataTypes.STRING)
  declare category: string;

  @Attribute(DataTypes.STRING)
  declare unitType: string;
}

export default ProductModel;