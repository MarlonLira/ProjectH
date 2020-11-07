import { ProductModel } from "../models/product.model";

export interface IProductService {
  save(product: ProductModel): Promise<ProductModel>;
  update(product: ProductModel): Promise<any>;
  getById(id: string): Promise<ProductModel>;
  delete(id: string): Promise<any>;
  toList(): Promise<ProductModel[]>;
}