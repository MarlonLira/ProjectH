import { DataTypes, ModelAttributes } from 'sequelize';

export const ProductMapping: ModelAttributes = {
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
  amount: {
    type: new DataTypes.INTEGER()
  },
  value: {
    type: new DataTypes.DECIMAL()
  },
  categoryId: {
    type: new DataTypes.INTEGER()
  }
};
