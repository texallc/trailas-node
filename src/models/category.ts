import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, HasMany } from '@sequelize/core/decorators-legacy';
import { Len } from '@sequelize/validator.js';
import { Category } from '../interfaces/category';
import { stringLargeLength, stringLength } from '../constants/constants';
import ProductModel from './product';

class CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> implements Omit<Category, "">{
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

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare active: boolean;

  @HasMany(() => ProductModel, /* foreign key */ 'category')
  declare products?: NonAttribute<ProductModel[]>;
}

export default CategoryModel;