import { AutoMap } from "@nartc/automapper";
import { TransactionType } from "../commons/enums/transactionType";
import { BaseModel } from "./base.model";
import { CategoryModel } from "./category.model";

export class ProductModel extends BaseModel {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public name: string;

  @AutoMap()
  public amount: number;

  @AutoMap()
  public value: number;

  @AutoMap()
  public categoryId: number;

  @AutoMap()
  public category: CategoryModel;
}