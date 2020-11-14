import { AutoMap } from '@nartc/automapper';
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
  public condition: string;

  @AutoMap()
  public categoryId: number;

  @AutoMap()
  public id: number;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date; 

  constructor(json?: any) {
    super(json);
    if (json) {
      this.status = json.status;
      this.token = json.token;
      this.amount = json.amount;
      this.userId = json.userId;
      this.condition = json.condition;
      this.categoryId = json.categoryId;
      this.id = json.id;
      this.createdAt = json.createdAt;
      this.updatedAt = json.updatedAt;
    }
  }
}

export class DonationDAO extends BaseEntityDAO { }

DonationDAO.init(DonationMapping, { sequelize: _instance, tableName: 'donation' });