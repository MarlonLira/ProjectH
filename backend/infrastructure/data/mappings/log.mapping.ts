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
    type: new DataTypes.STRING(255)
  },
  source: {
    type: new DataTypes.STRING(255)
  },
  code: {
    type: new DataTypes.STRING(30)
  },
  obj: {
    type: new DataTypes.TEXT("long")
  }
};