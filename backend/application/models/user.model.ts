import { AutoMap } from "@nartc/automapper";
import { TransactionType } from "../commons/enums/transactionType";
import { AddressModel } from "./address.model";
import { BaseModel } from "./base.model";
import { DonationModel } from "./donation.model";
import { PointModel } from "./point.model";

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
  public score: number;

  @AutoMap()
  public image: any;

  @AutoMap(() => PointModel)
  public points: PointModel[];

  @AutoMap(() => DonationModel)
  public donations: DonationModel[];

  @AutoMap(() => AddressModel)
  public address: AddressModel;

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
      this.score = json.score;
      this.image = json.image;
      this.points = json.points;
      this.donations = json.donations;
      this.address = json.address;
    }
  }
}