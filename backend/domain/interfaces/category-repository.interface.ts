import { CategoryEntity } from "../entities/category.entity";

export interface ICategoryRepository {
  save(product: CategoryEntity): Promise<CategoryEntity>;
  update(product: CategoryEntity): Promise<any>;
  getById(id: string): Promise<CategoryEntity>;
  delete(id: string): Promise<any>;
  toList(): Promise<CategoryEntity[]>;
}