import { AutoMapper } from "@nartc/automapper";
import { inject, injectable } from "inversify";
import { AddressEntity } from "../../domain/entities/address.entity";
import { IAddressRepository } from "../../domain/interfaces/address-repository.interface";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";
import { InnerException } from "../commons/core/innerException";
import { HttpCode } from "../commons/enums/httpCode";
import { HttpMessage } from "../commons/enums/httpMessage";
import { TransactionType } from "../commons/enums/transactionType";
import { IAddressService } from "../interfaces/address-service.interface";
import { ILogService } from "../interfaces/log-service.interface";
import { AddressModel } from "../models/address.model";

@injectable()
export class AddressService implements IAddressService {

  constructor(
    @inject(TYPES.IAddressRepository) private repository: IAddressRepository,
    @inject(TYPES.IMapper) private mapper: AutoMapper,
    @inject(TYPES.ILogService) private log: ILogService
  ) { }

  save(item: AddressModel): Promise<AddressModel> {
    return new Promise((resolve, reject) => {
      item.status = TransactionType.ACTIVE;
      this.repository.save(this.mapper.map(item, AddressEntity))
        .then((result: AddressEntity) => resolve(this.mapper.map(result, AddressModel)))
        .catch(async (error: any) =>
          reject(await this.log.critical('Address', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(item: AddressModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(this.mapper.map(item, AddressEntity))
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Address', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Address', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<AddressModel> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result: AddressEntity) => resolve(this.mapper.map(result, AddressModel)))
        .catch(async (error: any) =>
          reject(await this.log.critical('Address', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByUserId(userId: number): Promise<AddressModel> {
    return new Promise((resolve, reject) => {
      this.repository.getByUserId(userId)
        .then((result: AddressEntity) => resolve(this.mapper.map(result, AddressModel)))
        .catch(async (error: any) =>
          reject(await this.log.critical('Address', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}