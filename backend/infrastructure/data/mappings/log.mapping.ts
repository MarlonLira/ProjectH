import { DataTypes, ModelAttributes } from 'sequelize';

export const LogMapping: ModelAttributes = {
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  level: {
    type: new DataTypes.STRING(30)
  },
  message: {
    type: new DataTypes.STRING(30)
  },
  source: {
    type: new DataTypes.STRING(30)
  },
  code: {
    type: new DataTypes.STRING(30)
  },
  obj: {
    type: new DataTypes.STRING(30)
  },
  userId: {
    type: new DataTypes.INTEGER()
  }
};