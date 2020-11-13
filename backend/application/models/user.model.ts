import { AutoMap } from "@nartc/automapper";
import { TransactionType } from "../commons/enums/transactionType";
import { BaseModel } from "./base.model";

export class UserModel extends BaseModel {
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
      this.image = json.image;
    }
  }
}