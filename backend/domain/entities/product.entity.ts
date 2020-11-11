import { AutoMap } from '@nartc/automapper';
import { TransactionType } from "../../application/commons/enums/transactionType";
import { ProductMapping } from '../../infrastructure/data/mappings/product.mapping';
import { BaseEntity, BaseEntityDAO, _instance } from './base.entity';
import { CategoryEntity } from './category.entity';

export class ProductEntity extends BaseEntity {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public name: string;

  @AutoMap()
  public barCode: string;

  @AutoMap()
  public value: number;

  @AutoMap()
  public amount: number;

  @AutoMap()
  public categoryId: number;

  @AutoMap()
  public category: CategoryEntity;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.status = json.status;
      this.name = json.name;
      this.value = json.value;
      this.amount = json.amount;
      this.categoryId = json.categoryId;
      this.category = json.category;
    }
  }
}

export class ProductDAO extends BaseEntityDAO { }

ProductDAO.init(ProductMapping, { sequelize: _instance, tableName: 'product' });