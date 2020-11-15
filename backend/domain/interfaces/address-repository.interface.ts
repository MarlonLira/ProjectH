import { AddressEntity } from "../entities/address.entity";

export interface IAddressRepository {
  save(user: AddressEntity): Promise<AddressEntity>;
  update(user: AddressEntity): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<AddressEntity>;
  getByUserId(userId: number): Promise<AddressEntity>;
}