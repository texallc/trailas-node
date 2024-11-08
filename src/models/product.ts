import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, BelongsToMany, Table, BelongsTo, NotNull, HasMany, Unique, AllowNull } from '@sequelize/core/decorators-legacy';
import { Len, Max, Min } from '@sequelize/validator.js';
import { Product } from '../interfaces/product';
import { maxPrice, minPrice, stringLargeLength, stringLength } from '../constants/constants';
import CategoryModel from './category';
import InventoryModel from './inventory';
import ProductInventoryModel from './productInventory';
import SaleDetailsModel from './saleDetails';
import { TypeUnit } from '../types';

@Table({ tableName: 'products' })
class ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> implements Product {
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
  @Default("https://firebasestorage.googleapis.com/v0/b/trailas-texallc.appspot.com/o/images%2Fproducts%2Fno-imagen.png?alt=media&token=2f32955a-776a-453d-bc89-f66b0a78725a")
  declare image: string;

  @Attribute(DataTypes.DECIMAL(15, 2))
  @Max(maxPrice)
  @Min(minPrice)
  @NotNull
  declare price: number;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  @NotNull
  declare brand: string;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  @AllowNull
  @Unique
  declare partNumber: string | null;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare active: boolean;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  @Default("")
  declare unitType: TypeUnit;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare categoryId: number;

  @BelongsTo(() => CategoryModel, 'categoryId')
  declare category: NonAttribute<CategoryModel>;

  @BelongsToMany(() => InventoryModel, {
    through: ProductInventoryModel,
    foreignKey: 'productId',
    otherKey: 'inventoryId'
  })
  declare inventories?: NonAttribute<InventoryModel[]>;

  @HasMany(() => SaleDetailsModel, 'productId')
  declare salesDetails?: NonAttribute<SaleDetailsModel[]>;
}

export default ProductModel;