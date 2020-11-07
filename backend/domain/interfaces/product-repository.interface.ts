import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
  save(product: ProductEntity): Promise<ProductEntity>;
  update(product: ProductEntity): Promise<any>;
  getById(id: number): Promise<ProductEntity>;
  delete(id: number): Promise<any>;
  toList(): Promise<ProductEntity[]>;
}