import { Sequelize } from 'sequelize';
import * as Config from '../../../presentation/config.json';
import { Attributes } from '../../../application/commons/core/attributes';

const { MySqlWEB, Logging } = Config.Database;

export class Context {

  private static _instance: Sequelize;

  /* #region  Db Configuration */
  private static createInstance(): Sequelize {
    const sequelize = new Sequelize(MySqlWEB.schema, MySqlWEB.username, MySqlWEB.password,
      {
        port: MySqlWEB.port,
        host: MySqlWEB.host,
        dialect: 'mysql',
        logging: Logging,
        omitNull: true,
        timezone: '-03:00',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    );
    return sequelize;
  }
  /* #endregion */

  public static getInstance(): Sequelize {
    this._instance = Attributes.returnIfValid(this._instance, this.createInstance());
    return this._instance;
  }

}