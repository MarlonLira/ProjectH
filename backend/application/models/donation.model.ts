import { AutoMap } from "@nartc/automapper";
import { ConditionType } from "../commons/enums/conditionType";
import { TransactionType } from "../commons/enums/transactionType";
import { BaseModel } from "./base.model";

export class DonationModel extends BaseModel {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public token: string;

  @AutoMap()
  public amount: number;

  @AutoMap()
  public userId: number;

  @AutoMap()
  public condition: ConditionType;

  @AutoMap()
  public categoryId: number;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.status = json.status;
      this.token = json.token;
      this.amount = json.amount;
      this.userId = json.userId;
      this.condition = json.condition;
      this.categoryId = json.categoryId;
    }
  }
}