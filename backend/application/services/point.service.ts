import { inject, injectable } from "inversify";
import { PointEntity } from "../../domain/entities/point.entity";
import { IPointRepository } from "../../domain/interfaces/point-repository.interface";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";
import { InnerException } from "../commons/core/innerException";
import { TransactionType } from "../commons/enums/transactionType";
import { IPointService } from "../interfaces/point-service.interface";
import { IMapper } from "../interfaces/mapper.interface";
import { PointModel } from "../models/Point.model";
import { HttpCode } from "../commons/enums/httpCode";
import { ILogService } from "../interfaces/log-service.interface";
import { HttpMessage } from "../commons/enums/httpMessage";

@injectable()
export class PointService implements IPointService {

  constructor(
    @inject(TYPES.IPointRepository) private repository: IPointRepository,
    @inject(TYPES.IMapper) private mapper: IMapper,
    @inject(TYPES.ILogService) private log: ILogService
  ) { }

  save(item: PointModel): Promise<PointModel> {
    return new Promise((resolve, reject) => {
      item.status = TransactionType.ACTIVE;
      this.repository.save(this.mapper.map(item, PointEntity))
        .then((result) => resolve(this.mapper.map(result, PointModel, PointEntity)))
        .catch(async (error: any) => reject(console.log(InnerException.decode(error))));
    });
  }

  update(entity: PointModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(this.mapper.map(entity, PointEntity, PointModel))
        .then((result) => resolve(result))
        .catch(async (error: any) => 
        reject(await this.log.critical('User', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<PointModel> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result) => resolve(result))
        .catch(async (error: any) => reject(console.log(InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result) => resolve(result))
        .catch(async (error: any) => reject(console.log(InnerException.decode(error))));
    });
  }

  toList(): Promise<PointModel[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList()
        .then((result: PointEntity[]) => resolve(result))
        .catch(async (error: any) => reject(console.log(InnerException.decode(error))));
    });
  }
}