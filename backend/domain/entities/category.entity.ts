import { AutoMap } from '@nartc/automapper';
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
  public measure: string;

  @AutoMap()
  public products: ProductEntity[];

  constructor(json?: any) {
    super(json);
    if (json) {
      this.status = json.status;
      this.name = json.name;
      this.measure = json.measure;
      this.products = json.products;
    }
  }
}

export class CategoryDAO extends BaseEntityDAO { }

CategoryDAO.init(CategoryMapping, { sequelize: _instance, tableName: 'category' });