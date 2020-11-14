import { AutoMap } from '@nartc/automapper';
import { Json } from '../../application/commons/core/json';
import { TransactionType } from "../../application/commons/enums/transactionType";
import { UserMapping } from '../../infrastructure/data/mappings/user.mapping';
import { BaseEntity, BaseEntityDAO, _instance } from './base.entity';
import { PointEntity } from './point.entity';

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

  @AutoMap(() => PointEntity)
  public points: PointEntity[];

  @AutoMap()
  public image: any;

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
    }
  }
}

export class UserDAO extends BaseEntityDAO { }

UserDAO.init(UserMapping, { sequelize: _instance, tableName: 'user' });