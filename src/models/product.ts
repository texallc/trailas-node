import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, BelongsToMany, Table, BelongsTo, NotNull } from '@sequelize/core/decorators-legacy';
import { Len, Max, Min } from '@sequelize/validator.js';
import { Product } from '../interfaces/product';
import { maxPrice, minPrice, stringLargeLength, stringLength } from '../constants/constants';
import CategoryModel from './category';
import InventoryModel from './inventory';
import ProductInventoryModel from './productInventory';

@Table({ tableName: 'products' })
class ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> implements Product {
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
  @Len(stringLength)
  declare unitType: string;

  @BelongsTo(() => CategoryModel, 'categoryId')
  declare category: NonAttribute<CategoryModel>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare categoryId: number;

  @BelongsToMany(() => InventoryModel, {
    through: ProductInventoryModel,
    foreignKey: 'productId',
    otherKey: 'inventoryId'
  })
  declare inventories?: NonAttribute<InventoryModel[]>;
}

export default ProductModel;