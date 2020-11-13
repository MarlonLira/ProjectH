import { AutoMapper, ProfileBase } from '@nartc/automapper';
import { BaseEntity } from '../../domain/entities/base.entity';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { ProductEntity } from '../../domain/entities/product.entity';
import { DonationEntity } from '../../domain/entities/donation.entity';
import { BaseModel } from '../models/base.model';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
import { DonationModel } from '../models/donation.model';

export class EntityToModel extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(BaseEntity, BaseModel);
    mapper.createMap(ProductEntity, ProductModel);
    mapper.createMap(CategoryEntity, CategoryModel);
    mapper.createMap(DonationEntity, DonationModel);
  }
}