import { AutoMap } from "@nartc/automapper";
import { HttpCode } from "../../application/commons/enums/httpCode";
import { LogLevel } from "../../application/commons/enums/log-level";
import { LogMapping } from "../../infrastructure/data/mappings/log.mapping";
import { BaseEntity, BaseEntityDAO, _instance } from "./base.entity";

export class LogEntity extends BaseEntity {
  @AutoMap()
  public level: LogLevel;

  @AutoMap()
  public message: string;

  @AutoMap()
  public source: string;

  @AutoMap()
  public code: HttpCode;

  @AutoMap()
  public obj: string;

  @AutoMap()
  public userId: string;

  @AutoMap()
  isRecord: boolean;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.level = json.level;
      this.message = json.message;
      this.source = json.source;
      this.code = json.code;
      this.obj = json.obj;
      this.isRecord = json.isRecord;
      this.userId = json.userId;
    }
  }
}

export class LogDAO extends BaseEntityDAO { }

LogDAO.init(LogMapping, { sequelize: _instance, tableName: 'log' });
