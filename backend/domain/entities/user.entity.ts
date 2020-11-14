import { AutoMap } from '@nartc/automapper';
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

  @AutoMap()
  public points: PointEntity[];

  @AutoMap()
  public image: any;

  constructor(json?: any) {
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
      this.points = json.points;
      this.image = json.image;
    }
  }
}

export class UserDAO extends BaseEntityDAO { }

UserDAO.init(UserMapping, { sequelize: _instance, tableName: 'user' });