import { AutoMap } from "@nartc/automapper";
import { TransactionType } from "../commons/enums/transactionType";
import { BaseModel } from "./base.model";
import { ProductModel } from "./product.model";

export class CategoryModel extends BaseModel {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public name: string;

  @AutoMap()
  public measure: string;

  @AutoMap()
  public products?: ProductModel[];
}