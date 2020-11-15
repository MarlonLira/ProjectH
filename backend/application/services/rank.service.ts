import { AutoMapper } from "@nartc/automapper";
import { inject, injectable } from "inversify";
import { RankEntity } from "../../domain/entities/rank.entity";
import { IRankRepository } from "../../domain/interfaces/rank-repository.interface";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";
import { InnerException } from "../commons/core/innerException";
import { HttpCode } from "../commons/enums/httpCode";
import { HttpMessage } from "../commons/enums/httpMessage";
import { ILogService } from "../interfaces/log-service.interface";
import { IRankService } from "../interfaces/rank-service.interface";
import { RankModel } from "../models/rank.model";

@injectable()
export class RankService implements IRankService {

  constructor(
    @inject(TYPES.IRankRepository) private repository: IRankRepository,
    @inject(TYPES.IMapper) private mapper: AutoMapper,
    @inject(TYPES.ILogService) private log: ILogService
  ) { }

  getByScore(score: number): Promise<RankModel> {
    return new Promise((resolve, reject) => {
      const _score = score ? score : 0;
      this.repository.getByScore(_score)
        .then((result: RankEntity) => resolve(this.mapper.map(result, RankModel)))
        .catch(async (error: any) =>
          reject(await this.log.critical('Rank', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<RankModel> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result: RankEntity) => resolve(this.mapper.map(result, RankModel)))
        .catch(async (error: any) =>
          reject(await this.log.critical('Rank', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByName(name: string): Promise<RankModel> {
    return new Promise((resolve, reject) => {
      this.repository.getByName(name)
        .then((result: RankEntity) => resolve(this.mapper.map(result, RankModel)))
        .catch(async (error: any) =>
          reject(await this.log.critical('Rank', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}