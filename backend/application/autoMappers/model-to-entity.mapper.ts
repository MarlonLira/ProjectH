import { AutoMapper, ProfileBase } from '@nartc/automapper';
import { BaseEntity } from '../../domain/entities/base.entity';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { ProductEntity } from '../../domain/entities/product.entity';
import { BaseModel } from '../models/base.model';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';

export class ModelToEntity extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(BaseModel, BaseEntity);
    mapper.createMap(ProductModel, ProductEntity);
    mapper.createMap(CategoryModel, CategoryEntity);
  }
}