import { injectable } from "inversify";
import { Op } from "sequelize";
import { Json } from "../../../application/commons/core/json";
import { TransactionType } from "../../../application/commons/enums/transactionType";
import { PointDAO } from "../../../domain/entities/point.entity";
import { UserDAO, UserEntity } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/interfaces/user-repository.interface";

@injectable()
export class UserRepository implements IUserRepository {

  getById(id: number): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      UserDAO.findByPk(id,
        {
          include: [{ model: PointDAO, as: 'points' }]
        }
      )
        .then((result: any) => resolve(new UserEntity(result)))
        .catch((error: any) => reject(error));
    });
  }

  save(item: UserEntity): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserDAO.sequelize.transaction();
      UserDAO.create(item, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new UserEntity(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(item: UserEntity): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserDAO.sequelize.transaction();
      UserDAO.update(item, {
        where: {
          id: item.id
        },
        transaction: _transaction,
        validate: false
      })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  delete(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserDAO.sequelize.transaction();
      UserDAO.update({
        status: TransactionType.DELETED
      },
        {
          where: {
            id: { [Op.eq]: id }
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback()
          reject(error);
        });
    });
  }

  getByEmail(email: string): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      UserDAO.findOne({
        where: {
          email: { [Op.eq]: email },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      }).then((result: any) => resolve(new UserEntity(result)))
        .catch((error: any) => reject(error));
    });
  }

}