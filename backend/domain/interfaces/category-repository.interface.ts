import { CategoryEntity } from "../entities/category.entity";

export interface ICategoryRepository {
  save(product: CategoryEntity): Promise<CategoryEntity>;
  update(product: CategoryEntity): Promise<any>;
  getById(id: number): Promise<CategoryEntity>;
  delete(id: number): Promise<any>;
  toList(): Promise<CategoryEntity[]>;
}