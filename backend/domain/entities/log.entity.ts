import { AutoMap } from "@nartc/automapper";
import { LogMapping } from "../../infrastructure/data/mappings/log.mapping";
import { BaseEntity, BaseEntityDAO, _instance } from "./base.entity";

export class LogEntity extends BaseEntity {
  @AutoMap()
  public level: string;

  @AutoMap()
  public message: string;

  @AutoMap()
  public source: string;

  @AutoMap()
  public code: string;

  @AutoMap()
  public obj: string;

  @AutoMap()
  public userId: string;
}

export class LogDAO extends BaseEntityDAO { }

LogDAO.init(LogMapping, { sequelize: _instance, tableName: 'log' });
