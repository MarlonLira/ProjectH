import { DataTypes, ModelAttributes } from 'sequelize';

export const DonationMapping: ModelAttributes = {
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  token: {
    type: new DataTypes.STRING(10),
    allowNull: false
  },
  amount: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  userId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  condition: {
    type: new DataTypes.STRING(5),
    allowNull: false
  },
  categoryId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
};