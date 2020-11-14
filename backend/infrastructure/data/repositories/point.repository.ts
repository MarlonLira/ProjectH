import { injectable } from "inversify";
import { Op } from 'sequelize';
import { Json } from "../../../application/commons/core/json";
import { PointDAO, PointEntity } from "../../../domain/entities/point.entity";
import { IPointRepository } from "../../../domain/interfaces/point-repository.interface";

@injectable()
export class PointRepository implements IPointRepository {

  save(item: PointEntity): Promise<PointEntity> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await PointDAO.sequelize.transaction();
      PointDAO.create(item, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new PointEntity(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(item: PointEntity): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await PointDAO.sequelize.transaction();
      PointDAO.update(item,
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

  getById(id: number): Promise<PointEntity> {
    return new Promise((resolve, reject) => {
      PointDAO.findByPk(id)
        .then((result: any) => resolve(new PointEntity(result)))
        .catch((error: any) => reject(error));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await PointDAO.sequelize.transaction();
      PointDAO.destroy(
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

  toList(): Promise<PointEntity[]> {
    return new Promise((resolve, reject) => {
      PointDAO.findAll()
        .then((result: any) => resolve(Json.parse(result)))
        .catch((error: any) => reject(error));
    });
  }

}