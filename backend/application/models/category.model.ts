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
  public products: ProductModel[];

  constructor(json?: any) {
    super(json);
    if (json) {
      this.status = json.status;
      this.name = json.name;
      this.products = json.products;
    }
  }
}