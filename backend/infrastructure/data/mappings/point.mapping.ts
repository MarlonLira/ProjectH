import { DataTypes, ModelAttributes } from 'sequelize';

export const PointMapping: ModelAttributes = {
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  value: {
    type: new DataTypes.DOUBLE(),
    allowNull: false
  },
  shoppingId: {
    type: new DataTypes.INTEGER()
  },
  donationId: {
    type: new DataTypes.INTEGER()
  },
  userId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
};
