import { AutoMap } from "@nartc/automapper";
import { TransactionType } from "../commons/enums/transactionType";
import { BaseModel } from "./base.model";

export class AddressModel extends BaseModel {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public zipcode: string;

  @AutoMap()
  public street: string;

  @AutoMap()
  public number: string;

  @AutoMap()
  public city: string;

  @AutoMap()
  public state: string;

  @AutoMap()
  public country: string;

  @AutoMap()
  public complement: string;

  @AutoMap()
  public userId: number;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.status = json.status;
      this.zipcode = json.zipcode;
      this.street = json.street;
      this.number = json.number;
      this.city = json.city;
      this.state = json.state;
      this.country = json.country;
      this.complement = json.complement;
      this.userId = json.userId;
    }
  }
}