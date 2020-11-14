import { DataTypes, ModelAttributes } from 'sequelize';

export const RankMapping: ModelAttributes = {
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
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  score: {
    type: new DataTypes.STRING(30),
    allowNull: false
  }
};
