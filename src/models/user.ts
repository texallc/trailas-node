import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, Unique, Table, HasMany } from '@sequelize/core/decorators-legacy';
import { IsEmail, Len } from '@sequelize/validator.js';
import { User } from '../interfaces/user';
import { isEmail, phoneLength, rfcLength, stringLargeLength, stringLength } from '../constants/constants';
import InventoryModel from './inventory';
import MovementModel from './movement';
import { Roles } from "../types";
import SaleModel from './sale';

@Table({ tableName: 'users' })
class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> implements User {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id?: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @Unique
  @Len(stringLength)
  declare uid: string;

  @Attribute(DataTypes.STRING)
  @IsEmail(isEmail)
  @Len(stringLength)
  declare email: string;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  declare name: string;

  @Attribute(DataTypes.INTEGER)
  @Len(phoneLength)
  declare phone: number;

  @Attribute(DataTypes.TEXT)
  @Len(stringLargeLength)
  declare description: string;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  declare image: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare active: boolean;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  declare role: Roles;

  @HasMany(() => InventoryModel, 'userId')
  declare inventories?: NonAttribute<InventoryModel[]>;

  @HasMany(() => MovementModel, 'userId')
  declare movements?: NonAttribute<MovementModel[]>;

  @HasMany(() => SaleModel, {
    foreignKey: 'sellerId',
  })
  declare salesSeller?: NonAttribute<SaleModel[]>;

  @HasMany(() => SaleModel, 'buyerId')
  declare salesBuyer?: NonAttribute<SaleModel[]>;

  @Attribute(DataTypes.STRING)
  @Len(rfcLength)
  declare rfc: string;
}

export default UserModel;