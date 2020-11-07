import { injectable } from "inversify";
import { ProductDAO, ProductEntity } from "../../../domain/entities/product.entity";
import { IProductRepository } from "../../../domain/interfaces/product-repository.interface";

@injectable()
export class ProductRepository implements IProductRepository {

  save(item: ProductEntity): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }

  update(item: ProductEntity): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getById(id: string): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  toList(): Promise<ProductEntity[]> {
    throw new Error("Method not implemented.");
  }

}