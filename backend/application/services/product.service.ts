import { Mapper } from "@nartc/automapper";
import { inject, injectable } from "inversify";
import { ProductEntity } from "../../domain/entities/product.entity";
import { IProductRepository } from "../../domain/interfaces/product-repository.interface";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";
import { InnerException } from "../commons/core/innerException";
import { IProductService } from "../interfaces/product-service.interface";
import { ProductModel } from "../models/product.model";

@injectable()
export class ProductService implements IProductService {

  constructor(@inject(TYPES.IProductRepository) private repository: IProductRepository) { }

  save(entity: ProductModel): Promise<ProductModel> {
    return new Promise((resolve, reject) => {
      this.repository.save(Mapper.map(entity, ProductEntity, ProductModel))
        .then((result) => resolve(Mapper.map(result, ProductModel, ProductEntity)))
        .catch(async (error: any) => reject(console.log(InnerException.decode(error))));
    });
  }

  update(entity: ProductModel): Promise<ProductModel> {
    return new Promise((resolve, reject) => {
      this.repository.update(Mapper.map(entity, ProductEntity, ProductModel))
        .then((result) => resolve(result))
        .catch(async (error: any) => reject(console.log(InnerException.decode(error))));
    });
  }

  toList(): Promise<ProductModel[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList()
        .then((result: any) => resolve(result))
        .catch(async (error: any) => reject(console.log(InnerException.decode(error))));
    });
  }

  getById(id: string): Promise<ProductModel> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result) => resolve(Mapper.map(result, ProductModel, ProductEntity)))
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

}