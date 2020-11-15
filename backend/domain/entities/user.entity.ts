import { AutoMap } from '@nartc/automapper';
import { Json } from '../../application/commons/core/json';
import { TransactionType } from "../../application/commons/enums/transactionType";
import { UserMapping } from '../../infrastructure/data/mappings/user.mapping';
import { AddressEntity } from './address.entity';
import { BaseEntity, BaseEntityDAO, _instance } from './base.entity';
import { DonationEntity } from './donation.entity';
import { PointEntity } from './point.entity';
import { RankEntity } from './rank.entity';

export class UserEntity extends BaseEntity {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public name: string;

  @AutoMap()
  public registryCode: string;

  @AutoMap()
  public email: string;

  @AutoMap()
  public password: string;

  @AutoMap()
  public gender: number;

  @AutoMap()
  public birthday: Date;

  @AutoMap()
  public score: number;

  @AutoMap()
  public image: any;

  @AutoMap(() => PointEntity)
  public points: PointEntity[];

  @AutoMap(() => DonationEntity)
  public donations: DonationEntity[];

  @AutoMap(() => AddressEntity)
  public address: AddressEntity;

  @AutoMap(() => RankEntity)
  public rank: RankEntity;

  constructor(json?: any) {
    json = Json.parse(json);
    super(json);
    if (json) {
      this.status = json.status;
      this.name = json.name;
      this.registryCode = json.registryCode;
      this.email = json.email;
      this.password = json.password;
      this.gender = json.gender;
      this.birthday = json.birthday;
      this.score = json.score;
      this.image = json.image;
      this.points = json.points;
      this.donations = json.donations;
      this.address = json.address;
      this.rank = json.rank;
    }
  }
}

export class UserDAO extends BaseEntityDAO { }

UserDAO.init(UserMapping, { sequelize: _instance, tableName: 'user' });