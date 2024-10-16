import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, Unique } from '@sequelize/core/decorators-legacy';
import { IsEmail, Len } from '@sequelize/validator.js';
import { User } from '../interfaces/users';
import { isEmail, phoneLength, stringLargeLength, stringLength } from '../constants/constants';

class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> implements Omit<User, "role"> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

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

  @Attribute(DataTypes.STRING)
  @Len(stringLargeLength)
  declare description: string;

  @Attribute(DataTypes.STRING)
  @Len(stringLength)
  declare image: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare active: boolean;
}

export default UserModel;