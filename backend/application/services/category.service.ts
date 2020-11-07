import { Mapper } from "@nartc/automapper";
import { inject, injectable } from "inversify";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { ICategoryRepository } from "../../domain/interfaces/category-repository.interface";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";
import { InnerException } from "../commons/core/innerException";
import { ICategoryService } from "../interfaces/category-service.interface";
import { CategoryModel } from "../models/category.model";

@injectable()
export class CategoryService implements ICategoryService {

  constructor(@inject(TYPES.ICategoryRepository) private repository: ICategoryRepository) { }

  save(item: CategoryModel): Promise<CategoryModel> {
    console.log(item)
    return new Promise((resolve, reject) => {
      this.repository.save(Mapper.map(item, CategoryEntity, CategoryModel))
        .then((result) => resolve(Mapper.map(result, CategoryModel, CategoryEntity)))
        .catch(async (error: any) => reject(console.log(InnerException.decode(error))));
    });
  }

  update(entity: CategoryModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(Mapper.map(entity, CategoryEntity, CategoryModel))
        .then((result) => resolve(result))
        .catch(async (error: any) => reject(console.log(InnerException.decode(error))));
    });
  }

  getById(id: string): Promise<CategoryModel> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result) => resolve(Mapper.map(result, CategoryModel, CategoryEntity)))
        .catch(async (error: any) => reject(console.log(InnerException.decode(error))));
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result) => resolve(result))
        .catch(async (error: any) => reject(console.log(InnerException.decode(error))));
    });
  }

  toList(): Promise<CategoryModel[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList()
        .then((result: CategoryEntity[]) => resolve(Mapper.mapArray(result, CategoryModel, CategoryEntity)))
        .catch(async (error: any) => reject(console.log(InnerException.decode(error))));
    });
  }
}