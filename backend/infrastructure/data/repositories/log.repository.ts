import { injectable } from "inversify";
import { LogDAO, LogEntity } from "../../../domain/entities/log.entity";
import { ILogRepository } from "../../../domain/interfaces/log-repository.interface";

@injectable()
export class LogRepository implements ILogRepository {

  save(log: LogEntity): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await LogDAO.sequelize.transaction();
      LogDAO.create(log, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new LogEntity(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }
}