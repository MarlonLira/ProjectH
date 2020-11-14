import { AutoMapper, ProfileBase } from '@nartc/automapper';
import { BaseEntity } from '../../domain/entities/base.entity';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { LogEntity } from '../../domain/entities/log.entity';
import { PointEntity } from '../../domain/entities/point.entity';
import { ProductEntity } from '../../domain/entities/product.entity';
import { RankEntity } from '../../domain/entities/rank.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { BaseModel } from '../models/base.model';
import { CategoryModel } from '../models/category.model';
import { LogModel } from '../Models/log.model';
import { PointModel } from '../models/point.model';
import { ProductModel } from '../models/product.model';
import { RankModel } from '../models/rank.model';
import { UserModel } from '../models/user.model';

export class EntityToModel extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(BaseEntity, BaseModel);
    mapper.createMap(ProductEntity, ProductModel);
    mapper.createMap(CategoryEntity, CategoryModel);
    mapper.createMap(UserEntity, UserModel);
    mapper.createMap(PointEntity, PointModel);
    mapper.createMap(LogEntity, LogModel);
    mapper.createMap(RankEntity, RankModel);
  }
}