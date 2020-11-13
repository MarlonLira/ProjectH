import { DataTypes, ModelAttributes } from 'sequelize';

export const UserMapping: ModelAttributes = {
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
  registryCode: {
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  email: {
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  password: {
    type: new DataTypes.STRING(100),
    allowNull: false
  },
  gender: {
    type: new DataTypes.TINYINT(),
    allowNull: false
  },
  birthday: {
    type: new DataTypes.DATE()
  },
  image: {
    type: new DataTypes.BLOB("medium"),
    get() {
      return this.getDataValue('image') ? this.getDataValue('image').toString('base64') : undefined;
    }
  }
};
