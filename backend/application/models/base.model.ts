import { AutoMap } from "@nartc/automapper";

export class BaseModel {
  @AutoMap()
  public id: String;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;
}