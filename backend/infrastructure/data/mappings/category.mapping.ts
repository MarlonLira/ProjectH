import { DataTypes, ModelAttributes } from 'sequelize';

export const CategoryMapping: ModelAttributes = {
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  name: {
    type: new DataTypes.STRING(30)
  },
  measure: {
    type: new DataTypes.STRING(5)
  }
};