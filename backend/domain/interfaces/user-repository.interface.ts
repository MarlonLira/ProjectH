import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
  save(user: UserEntity): Promise<UserEntity>;
  update(user: UserEntity): Promise<any>;
  delete(id: number): Promise<any>;
  getByEmail(email: string): Promise<UserEntity>;
  getById(id: number): Promise<UserEntity>;
}