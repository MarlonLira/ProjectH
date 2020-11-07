import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
  save(product: ProductEntity): Promise<ProductEntity>;
  update(product: ProductEntity): Promise<any>;
  getById(id: string): Promise<ProductEntity>;
  delete(id: string): Promise<any>;
  toList(): Promise<ProductEntity[]>;
}