import { AutoMap } from '@nartc/automapper';
import { Json } from '../../application/commons/core/json';
import { TransactionType } from "../../application/commons/enums/transactionType";
import { CategoryMapping } from '../../infrastructure/data/mappings/category.mapping';
import { BaseEntity, BaseEntityDAO, _instance } from './base.entity';
import { ProductEntity } from './product.entity';

export class CategoryEntity extends BaseEntity {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public name: string;
  
  @AutoMap()
  public products: ProductEntity[];

  constructor(json?: any) {
    json = Json.parse(json);
    super(json);
    if (json) {
      this.status = json.status;
      this.name = json.name;
      this.products = json.products;
    }
  }
}

export class CategoryDAO extends BaseEntityDAO { }

CategoryDAO.init(CategoryMapping, { sequelize: _instance, tableName: 'category' });