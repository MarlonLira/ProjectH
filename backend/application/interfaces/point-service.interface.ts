import { UserModel } from "../models/user.model";

export interface IPointService {
  save(user: UserModel): Promise<UserModel>;
  update(user: UserModel): Promise<any>;
  delete(id: number): Promise<any>;
  signin(user: UserModel): Promise<any>;
}