import { Sequelize } from 'sequelize';
import * as Config from '../../../presentation/config.json';
import { Logger } from '../../../application/commons/core/logger';
import { Context } from './db.context';

// Mappings
import { LogDAO } from '../../../domain/entities/log.entity';
import { ProductDAO } from '../../../domain/entities/product.entity';
import { CategoryDAO } from '../../../domain/entities/category.entity';
import { UserDAO } from '../../../domain/entities/user.entity';
import { PointDAO } from '../../../domain/entities/point.entity';
import { DonationDAO } from '../../../domain/entities/donation.entity';

const { ForceSync, AlterSync, DropAllTable, IsLogger } = Config.Database;

interface PersistenceModel {
  name: string;
  entity: Sequelize
}

export class Persistence {

  public Build() {
    // The order influences creation in the database!
    const models: PersistenceModel[] = [
      { name: 'Category', entity: CategoryDAO.sequelize },
      { name: 'Product', entity: ProductDAO.sequelize },
      { name: 'Log', entity: LogDAO.sequelize },
      { name: 'User', entity: UserDAO.sequelize },
      { name: 'Point', entity: PointDAO.sequelize },
      { name: 'Donation', entity: DonationDAO.sequelize },
    ];

    Logger.Info('Database', 'Table verification started!');

    /* #region  Table Relationships */

    // N:N - belongs to many

    // 1:N - has many
    CategoryDAO.hasMany(ProductDAO, { foreignKey: 'categoryId', as: 'products' });
    CategoryDAO.hasMany(DonationDAO, { foreignKey: 'categoryId', as: 'donations' });
    UserDAO.hasMany(PointDAO, { foreignKey: 'userId', as: 'points' });
    UserDAO.hasMany(DonationDAO, { foreignKey: 'userId', as: 'donations' });

    // N:1 - belongs to
    ProductDAO.belongsTo(CategoryDAO, { as: 'category' });
    PointDAO.belongsTo(UserDAO, { as: 'user' });
    DonationDAO.belongsTo(UserDAO, { as: 'user' });
    DonationDAO.belongsTo(CategoryDAO, { as: 'category' });

    // 1:1 - has one

    /* #endregion */
    this.checkAndBuild(models)
      .catch((error: any) => {
        if (error.toString().indexOf('ETIMEDOUT') != -1) {
          Logger.Info('Database', 'trying to connect to the database again!');
          this.checkAndBuild(models);
        }
      });
  }

  /* #region  Checking and Build the Database */

  private checkAndBuild(models: PersistenceModel[]): Promise<any> {
    return new Promise((resolve, reject) => {
      Context.getInstance()
        .authenticate({ logging: (IsLogger ? msg => Logger.Info('Authenticate', msg) : IsLogger) })
        .then(() => {
          Logger.Info('Database', 'Connection established successfully!');
          this.CreateTables(models)
            .then(result => {
              Logger.Info('Database', `Table verification ${result}!`);
              resolve(true);
            });
        })
        .catch(error => {
          Logger.Error('Database', 'Error when trying to connect to the database!');
          Logger.Error('Database', error);
          reject(error);
        });
    });
  }

  private async CreateTables(models: { name: string, entity: Sequelize }[], count = 0, success = 0, errors = 0, total = 0) {
    return new Promise(async (resolve) => {
      const modelsWithErrors = [];

      if (DropAllTable) {
        await this.DropAllTables(models);
      }

      if (total < models.length) {
        models[count].entity.sync(
          {
            force: ForceSync,
            alter: AlterSync,
            logging: (IsLogger ? msg => Logger.Info(models[count].name, msg) : IsLogger)
          })
          .then(() => {
            Logger.Info(models[count].name, 'verification finished!');
            success++;
            total = success + errors;
            count++;
            this.CreateTables(models, count, success, errors, total);
          })
          .catch(error => {
            Logger.Error(models[count].name, error);
            modelsWithErrors.push(models[count]);
            errors++;
            total = success + errors;
            count++;
            this.CreateTables(models, count, success, errors, total);
          });
      } else {
        Logger.Info('Database', `verification result => Sucess: ${success} | Errors: ${errors} | Total: ${models.length}`);

        if (errors > 0) {
          Logger.Error('Database', `${errors} errors in the models were found!`);
          Logger.Warn('Database', 'trying to fix the models');
          await this.TryFixModels(modelsWithErrors, resolve);
        } else {
          resolve('finished successfully');
        }
      }
    });
  }

  private async TryFixModels(modelsWithErrors: any[], resolve: (value?: unknown) => void, count = 0, attempts = 0, sucess = 0, errors = 0) {
    if (attempts < modelsWithErrors.length) {
      modelsWithErrors[count].entity.sync(
        {
          alter: AlterSync,
          logging: IsLogger ? msg => Logger.Info(modelsWithErrors[count].name, msg) : IsLogger
        })
        .then(() => {
          Logger.Info(modelsWithErrors[count].name, 'correction completed!');
          sucess++;
          attempts = sucess + errors;
          count++;
          this.TryFixModels(modelsWithErrors, resolve, count, attempts, sucess, errors);
        })
        .catch(error => {
          Logger.Error(modelsWithErrors[count].name, error);
          errors++;
          attempts = sucess + errors;
          count++;
          this.TryFixModels(modelsWithErrors, resolve, count, attempts, sucess, errors);
        });
    } else {
      Logger.Info('Database', `correction attempts => Sucess: ${sucess} | Errors: ${errors} | Total: ${attempts}`);
      if (errors > 0) {
        resolve('finished with errors');
      }
      else {
        resolve('finished successfully and corrected errors');
      }
    }
  }

  private async DropAllTables(models: { name: string; entity: Sequelize; }[]) {
    const queryInterface = models[0].entity.getQueryInterface();
    await queryInterface.dropAllTables()
      .then(() => {
        Logger.Warn('Database', 'drop all the table finished!');
      }).catch(error => {
        Logger.Error('Database', error);
      });
  }
  /* #endregion */
}