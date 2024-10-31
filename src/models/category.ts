import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, HasMany, Table, NotNull } from '@sequelize/core/decorators-legacy';
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
  @NotNull
  declare name: string;

  @Attribute(DataTypes.TEXT)
  @Len(stringLargeLength)
  @Default("")
  declare description: string;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  @Default("https://firebasestorage.googleapis.com/v0/b/trailas-texallc.appspot.com/o/images%2Fcategories%2Fnodisponible.jpg?alt=media&token=aa35fbcc-1b02-4d38-a3a5-c76750168ba3")
  declare image: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare active: boolean;

  @HasMany(() => ProductModel, /* foreign key */ 'categoryId')
  declare products?: NonAttribute<ProductModel[]>;
}

export default CategoryModel;