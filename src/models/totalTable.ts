import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Table, Unique } from '@sequelize/core/decorators-legacy';
import { Len, Max, Min } from '@sequelize/validator.js';
import { TotalTables } from '../interfaces/totalTables';
import { maxStock, minStock, stringLength } from '../constants/constants';
import { TableNames } from '../types';


@Table({ tableName: 'totalTables' })
class TotalTablesModel extends Model<InferAttributes<TotalTablesModel>, InferCreationAttributes<TotalTablesModel>> implements TotalTables {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @Unique
  @Len(stringLength)
  declare tableName: TableNames;

  @Attribute(DataTypes.INTEGER)
  @Max(maxStock)
  @Min(minStock)
  declare total: number;
}

export default TotalTablesModel;