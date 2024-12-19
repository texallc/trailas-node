import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  NonAttribute
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, Unique, Table, HasMany, NotNull, AllowNull } from '@sequelize/core/decorators-legacy';
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
  @Unique({
    name: 'email',
    msg: 'Ya existe un usuario con este email.'
  })
  @Len(stringLength)
  @NotNull
  declare email: string;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @Len(phoneLength)
  declare phone: string;

  @Attribute(DataTypes.TEXT)
  @Len(stringLargeLength)
  @Default("")
  declare description: string;

  @Attribute(DataTypes.TEXT)
  @Len(stringLargeLength)
  @Default("https://firebasestorage.googleapis.com/v0/b/trailas-texallc.appspot.com/o/images%2Fprofiles%2Fprofile-user-icon-isolated-on-white-background-eps10-free-vector.jpg?alt=media&token=2f3c8ccc-6c20-4a83-81d6-8bb28b7ac167")
  declare image: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare active: boolean;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  @NotNull
  declare role: Roles;

  @HasMany(() => InventoryModel, 'userId')
  declare inventories?: NonAttribute<InventoryModel[]>;

  @HasMany(() => MovementModel, 'userId')
  declare movements?: NonAttribute<MovementModel[]>;

  @HasMany(() => SaleModel, 'buyerId')
  declare salesSeller?: NonAttribute<SaleModel[]>;

  @HasMany(() => SaleModel, 'buyerId')
  declare salesBuyer?: NonAttribute<SaleModel[]>;

  @Attribute(DataTypes.STRING)
  @AllowNull
  @Len(rfcLength)
  declare rfc: string;
}

export default UserModel;