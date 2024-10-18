import {
  Model,
  InferAttributes,
  InferCreationAttributes,
} from '@sequelize/core';
import { Table } from '@sequelize/core/decorators-legacy';

@Table({ tableName: 'productInventory' })
class ProductInventoryModel extends Model<InferAttributes<ProductInventoryModel>, InferCreationAttributes<ProductInventoryModel>> {
  declare productId: number;
  declare inventoryId: number;
}

export default ProductInventoryModel;