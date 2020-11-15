import { AutoMap } from '@nartc/automapper';
import { ConditionType } from '../../application/commons/enums/conditionType';
import { TransactionType } from "../../application/commons/enums/transactionType";
import { DonationMapping } from '../../infrastructure/data/mappings/donation.mapping';
import { BaseEntity, BaseEntityDAO, _instance } from './base.entity';

export class DonationEntity extends BaseEntity {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public token: string;

  @AutoMap()
  public amount: number;

  @AutoMap()
  public userId: number;

  @AutoMap()
  public condition: ConditionType;

  @AutoMap()
  public categoryId: number;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.status = json.status;
      this.token = json.token;
      this.amount = json.amount;
      this.userId = json.userId;
      this.condition = json.condition;
      this.categoryId = json.categoryId;
    }
  }
}

export class DonationDAO extends BaseEntityDAO { }

DonationDAO.init(DonationMapping, { sequelize: _instance, tableName: 'donation' });