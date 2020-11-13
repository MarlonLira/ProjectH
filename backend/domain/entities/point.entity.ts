import { AutoMap } from '@nartc/automapper';
import { TransactionType } from "../../application/commons/enums/transactionType";
import { PointMapping } from '../../infrastructure/data/mappings/point.mapping';
import { BaseEntity, BaseEntityDAO, _instance } from './base.entity';

export class PointEntity extends BaseEntity {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public value: number;

  @AutoMap()
  public shoppingId: number;

  @AutoMap()
  public donationId: number;

  @AutoMap()
  public userId: number;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.status = json.status;
      this.value = json.value;
      this.shoppingId = json.shoppingId;
      this.donationId = json.donationId;
      this.userId = json.userId;
    }
  }
}

export class PointDAO extends BaseEntityDAO { }

PointDAO.init(PointMapping, { sequelize: _instance, tableName: 'user' });