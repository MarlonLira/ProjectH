import { injectable } from "inversify";
import { Op } from "sequelize";
import { TransactionType } from "../../../application/commons/enums/transactionType";
import { AddressDAO, AddressEntity } from "../../../domain/entities/address.entity";
import { IAddressRepository } from "../../../domain/interfaces/address-repository.interface";

@injectable()
export class AddressRepository implements IAddressRepository {

  save(item: AddressEntity): Promise<AddressEntity> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await AddressDAO.sequelize.transaction();
      AddressDAO.create(item, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new AddressEntity(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(item: AddressEntity): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await AddressDAO.sequelize.transaction();
      AddressDAO.update(item, {
        where: { id: item.id },
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
      const _transaction = await AddressDAO.sequelize.transaction();
      AddressDAO.update({
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

  getById(id: number): Promise<AddressEntity> {
    return new Promise((resolve, reject) => {
      AddressDAO.findByPk(id)
        .then((result: any) => resolve(new AddressEntity(result)))
        .catch((error: any) => reject(error));
    });
  }

  getByUserId(userId: number): Promise<AddressEntity> {
    return new Promise((resolve, reject) => {
      AddressDAO.findOne({
        where: {
          userId: { [Op.eq]: userId }
        }
      })
        .then((result: any) => resolve(new AddressEntity(result)))
        .catch((error: any) => reject(error));
    });
  }
}