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
    type: new DataTypes.STRING(10)
  },
  amount: {
    type: new DataTypes.INTEGER()
  },
  userId: {
    type: new DataTypes.INTEGER()
  }
};