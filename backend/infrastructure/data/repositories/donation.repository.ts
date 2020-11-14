import { injectable } from "inversify";
import { Op } from 'sequelize';
import { Json } from "../../../application/commons/core/json";
import { DonationDAO, DonationEntity } from "../../../domain/entities/donation.entity";
import { IDonationRepository } from "../../../domain/interfaces/donation-repository.interface";

@injectable()
export class DonationRepository implements IDonationRepository {

  save(item: DonationEntity): Promise<DonationEntity> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await DonationDAO.sequelize.transaction();
      DonationDAO.create(item, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new DonationEntity(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(item: DonationEntity): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await DonationDAO.sequelize.transaction();
      DonationDAO.update(item,
        {
          where: { id: { [Op.eq]: item.id } },
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

  getById(id: number): Promise<DonationEntity> {
    return new Promise((resolve, reject) => {
      DonationDAO.findByPk(id)
        .then((result: any) => resolve(new DonationEntity(result)))
        .catch((error: any) => reject(error));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await DonationDAO.sequelize.transaction();
      DonationDAO.destroy(
        {
          where: { id: { [Op.eq]: id } },
          transaction: _transaction
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

  toList(): Promise<DonationEntity[]> {
    return new Promise((resolve, reject) => {
      DonationDAO.findAll()
        .then((result: any) => resolve(Json.parse(result)))
        .catch((error: any) => reject(error));
    });
  }

}