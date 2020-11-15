import { DataTypes, ModelAttributes } from 'sequelize';

export const AddressMapping: ModelAttributes = {
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  zipcode: {
    type: new DataTypes.STRING(15),
    allowNull: false
  },
  street: {
    type: new DataTypes.STRING(80),
    allowNull: false
  },
  number: {
    type: new DataTypes.STRING(10),
    allowNull: false
  },
  city: {
    type: new DataTypes.STRING(30)
  },
  state: {
    type: new DataTypes.STRING(30)
  },
  country: {
    type: new DataTypes.STRING(30)
  },
  complement: {
    type: new DataTypes.STRING(150)
  },
  userId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
};
