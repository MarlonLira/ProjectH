import { AutoMap } from "@nartc/automapper";
import { TransactionType } from "../commons/enums/transactionType";
import { BaseModel } from "./base.model";

export class RankModel extends BaseModel {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public name: string;

  @AutoMap()
  public score: number;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.status = json.status;
      this.name = json.name;
      this.score = json.score;
    }
  }
}