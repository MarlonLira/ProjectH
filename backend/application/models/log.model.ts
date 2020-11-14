import { AutoMap } from "@nartc/automapper";
import { HttpCode } from "../commons/enums/httpCode";
import { LogLevel } from "../commons/enums/log-level";
import { BaseModel } from "./base.model";

export class LogModel extends BaseModel {
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