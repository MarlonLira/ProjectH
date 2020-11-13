import { AutoMapper } from "@nartc/automapper";
import { inject, injectable } from "inversify";
import { ProductEntity } from "../../domain/entities/product.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/user-repository.interface";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";
import { Attributes } from "../commons/core/attributes";
import { Crypto } from "../commons/core/crypto";
import { InnerException } from "../commons/core/innerException";
import { CryptoType } from "../commons/enums/cryptoType";
import { HttpCode } from "../commons/enums/httpCode";
import { HttpMessage } from "../commons/enums/httpMessage";
import { TransactionType } from "../commons/enums/transactionType";
import { ILogService } from "../interfaces/log-service.interface";
import { IUserService } from "../interfaces/user-service.interface";
import { UserModel } from "../models/user.model";

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(TYPES.IUserRepository) private repository: IUserRepository,
    @inject(TYPES.IMapper) private mapper: AutoMapper,
    @inject(TYPES.ILogService) private log: ILogService
  ) { }

  save(item: UserModel): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      item.status = TransactionType.ACTIVE;
      item.password = Crypto.encrypt(item.password, CryptoType.PASSWORD);
      this.repository.save(this.mapper.map(item, UserEntity))
        .then((result: UserEntity) => resolve(this.mapper.map(result, UserModel)))
        .catch(async (error: any) =>
          reject(await this.log.critical('User', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(item: UserModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(this.mapper.map(item, UserEntity))
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('User', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('User', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  signin(user: UserModel): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (user.email) {
          const _user: UserModel = this.mapper.map(await this.repository.getByEmail(user.email), UserModel);
          if (Attributes.isValid(_user) && Crypto.compare(user.password, _user.password)) {
            user = _user;
            user.password = undefined;
            const result = await Crypto.encrypt(JSON.stringify(user), CryptoType.DEFAULT);
            resolve(result);
          } else {
            reject(await this.log.error('User', HttpCode.Bad_Request, HttpMessage.Login_Unauthorized, undefined));
          }
        } else {
          reject(await this.log.warn('User', HttpCode.Internal_Server_Error, HttpMessage.Parameters_Not_Provided, undefined));
        }
      } catch (error) {
        reject(await this.log.critical('User', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
      }
    });
  }

}