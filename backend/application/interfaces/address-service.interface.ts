import { AddressModel } from "../models/address.model";

export interface IAddressService {
  save(user: AddressModel): Promise<AddressModel>;
  update(user: AddressModel): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<AddressModel>;
  getByUserId(userId: number): Promise<AddressModel>;
}