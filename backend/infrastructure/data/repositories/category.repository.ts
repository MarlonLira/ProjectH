import { injectable } from "inversify";
import { Op } from 'sequelize';
import { Json } from "../../../application/commons/core/json";
import { CategoryDAO, CategoryEntity } from "../../../domain/entities/category.entity";
import { ICategoryRepository } from "../../../domain/interfaces/category-repository.interface";

@injectable()
export class CategoryRepository implements ICategoryRepository {

  save(item: CategoryEntity): Promise<CategoryEntity> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CategoryDAO.sequelize.transaction();
      CategoryDAO.create(item, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new CategoryEntity(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(item: CategoryEntity): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CategoryDAO.sequelize.transaction();
      CategoryDAO.update(item,
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

  getById(id: number): Promise<CategoryEntity> {
    return new Promise((resolve, reject) => {
      CategoryDAO.findByPk(id)
        .then((result: any) => resolve(new CategoryEntity(result)))
        .catch((error: any) => reject(error));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CategoryDAO.sequelize.transaction();
      CategoryDAO.destroy(
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

  toList(): Promise<CategoryEntity[]> {
    return new Promise((resolve, reject) => {
      CategoryDAO.findAll()
        .then((result: any) => resolve(Json.parse(result)))
        .catch((error: any) => reject(error));
    });
  }

}