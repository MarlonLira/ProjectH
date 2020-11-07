import { CategoryModel } from "../models/category.model";

export interface ICategoryService {
  save(product: CategoryModel): Promise<CategoryModel>;
  update(product: CategoryModel): Promise<any>;
  getById(id: number): Promise<CategoryModel>;
  delete(id: number): Promise<any>;
  toList(): Promise<CategoryModel[]>;
}