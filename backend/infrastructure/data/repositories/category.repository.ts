import { injectable } from "inversify";
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

  update(product: CategoryEntity): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getById(id: string): Promise<CategoryEntity> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  toList(): Promise<CategoryEntity[]> {
    throw new Error("Method not implemented.");
  }

}