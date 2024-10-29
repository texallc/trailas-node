import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, HasMany, Table } from '@sequelize/core/decorators-legacy';
import { Len } from '@sequelize/validator.js';
import { Category } from '../interfaces/category';
import { stringLargeLength, stringLength } from '../constants/constants';
import ProductModel from './product';

@Table({ tableName: 'categories' })
class CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> implements Category {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id?: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  declare name: string;

  @Attribute(DataTypes.TEXT)
  @Len(stringLargeLength)
  declare description: string;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  declare image: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare active: boolean;

  @HasMany(() => ProductModel, /* foreign key */ 'categoryId')
  declare products?: NonAttribute<ProductModel[]>;
}

export default CategoryModel;