import { inject, injectable } from "inversify";
import { DonationEntity } from "../../domain/entities/donation.entity";
import { IDonationRepository } from "../../domain/interfaces/donation-repository.interface";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";
import { InnerException } from "../commons/core/innerException";
import { TransactionType } from "../commons/enums/transactionType";
import { IDonationService } from "../interfaces/donation-service.interface";
import { IMapper } from "../interfaces/mapper.interface";
import { DonationModel } from "../models/donation.model";
import { Crypto } from "../commons/core/crypto";
import { ILogService } from "../interfaces/log-service.interface";
import { HttpCode } from "../commons/enums/httpCode";
import { HttpMessage } from "../commons/enums/httpMessage";

@injectable()
export class DonationService implements IDonationService {

  constructor(
    @inject(TYPES.IDonationRepository) private repository: IDonationRepository,
    @inject(TYPES.IMapper) private mapper: IMapper,
    @inject(TYPES.ILogService) private log: ILogService
  ) { }

  save(item: DonationModel): Promise<DonationModel> {
    return new Promise((resolve, reject) => {
      item.status = TransactionType.ACTIVE;
      item.token = Crypto.randomToken(9);
      this.repository.save(this.mapper.map(item, DonationEntity))
        .then((result) => resolve(this.mapper.map(result, DonationModel, DonationEntity)))
        .catch(async (error: any) =>
          reject(await this.log.critical('Donation', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));

    });
  }

  update(entity: DonationModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(this.mapper.map(entity, DonationEntity, DonationModel))
        .then((result) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Donation', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));

    });
  }

  getById(id: number): Promise<DonationModel> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result) => resolve(this.mapper.map(result, DonationModel, DonationEntity)))
        .catch(async (error: any) =>
          reject(await this.log.critical('Donation', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));

    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Donation', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));

    });
  }

  toList(): Promise<DonationModel[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList()
        .then((result: DonationEntity[]) => resolve(this.mapper.mapArray(result, DonationModel, DonationEntity)))
        .catch(async (error: any) =>
          reject(await this.log.critical('Donation', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));

    });
  }
}