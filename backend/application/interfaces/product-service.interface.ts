import { ProductModel } from "../models/product.model";

export interface IProductService {
  save(product: ProductModel): Promise<ProductModel>;
  update(product: ProductModel): Promise<any>;
  getById(id: number): Promise<ProductModel>;
  delete(id: number): Promise<any>;
  toList(): Promise<ProductModel[]>;
}