import { CategoryModel } from "../models/category.model";

export interface ICategoryService {
  save(product: CategoryModel): Promise<CategoryModel>;
  update(product: CategoryModel): Promise<any>;
  getById(id: string): Promise<CategoryModel>;
  delete(id: string): Promise<any>;
  toList(): Promise<CategoryModel[]>;
}