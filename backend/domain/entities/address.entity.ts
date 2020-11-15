import { AutoMap } from '@nartc/automapper';
import { Json } from '../../application/commons/core/json';
import { TransactionType } from "../../application/commons/enums/transactionType";
import { AddressMapping } from '../../infrastructure/data/mappings/address.mapping';
import { BaseEntity, BaseEntityDAO, _instance } from './base.entity';

export class AddressEntity extends BaseEntity {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public zipcode: string;

  @AutoMap()
  public street: string;

  @AutoMap()
  public number: string;

  @AutoMap()
  public city: string;

  @AutoMap()
  public state: string;

  @AutoMap()
  public country: string;

  @AutoMap()
  public complement: string;

  @AutoMap()
  public userId: number;

  constructor(json?: any) {
    json = Json.parse(json);
    super(json);
    if (json) {
      this.status = json.status;
      this.zipcode = json.zipcode;
      this.street = json.street;
      this.number = json.number;
      this.city = json.city;
      this.state = json.state;
      this.country = json.country;
      this.complement = json.complement;
      this.userId = json.userId;
    }
  }
}

export class AddressDAO extends BaseEntityDAO { }

AddressDAO.init(AddressMapping, { sequelize: _instance, tableName: 'address' });
