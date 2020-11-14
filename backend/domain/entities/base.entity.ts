import { AutoMap } from '@nartc/automapper';
import { Model } from 'sequelize';
import { Json } from '../../application/commons/core/json';
import { Context } from '../../infrastructure/data/context/db.context';

export const _instance = Context.getInstance();

export class BaseEntity {
  @AutoMap()
  public id: number;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.createdAt = json.createdAt;
      this.updatedAt = json.updatedAt;
    }
  }
}

export class BaseEntityDAO extends Model { }