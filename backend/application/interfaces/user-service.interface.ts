import { UserModel } from "../models/user.model";

export interface IUserService {
  save(user: UserModel): Promise<UserModel>;
  update(user: UserModel): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<UserModel>;
  signin(user: UserModel): Promise<any>;
}