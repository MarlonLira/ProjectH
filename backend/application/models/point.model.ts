import { AutoMap } from "@nartc/automapper";
import { Json } from "../commons/core/json";
import { TransactionType } from "../commons/enums/transactionType";
import { BaseModel } from "./base.model";

export class PointModel extends BaseModel {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public value: number;

  @AutoMap()
  public shoppingId: number;

  @AutoMap()
  public donationId: number;

  @AutoMap()
  public userId: number;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.status = json.status;
      this.value = json.value;
      this.shoppingId = json.shoppingId;
      this.donationId = json.donationId;
      this.userId = json.userId;
    }
  }
}