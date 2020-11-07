import { AutoMap } from "@nartc/automapper";
import { BaseModel } from "./base.model";

export class LogModel extends BaseModel {
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