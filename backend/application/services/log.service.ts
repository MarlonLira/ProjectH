import { AutoMapper } from "@nartc/automapper";
import { inject, injectable } from "inversify";
import { ILogRepository } from "../../domain/interfaces/log-repository.interface";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";
import { Logger } from "../commons/core/logger";
import { HttpCode } from "../commons/enums/httpCode";
import { LogLevel } from "../commons/enums/log-level";
import { ILogService } from "../interfaces/log-service.interface";
import { LogModel } from "../Models/log.model";
import { LogEntity } from "../../domain/entities/log.entity";
import * as Config from '../../presentation/config.json';

const { IsError, IsWarn, IsCrit, IsUnkn, IsInfo } = Config.LogRecord;

@injectable()
export class LogService implements ILogService {

  constructor(
    @inject(TYPES.ILogRepository) private repository: ILogRepository,
    @inject(TYPES.IMapper) private mapper: AutoMapper) { }

  save(log: LogModel): Promise<any> {
    return new Promise((resolve, reject) => {
      Logger.Default(log);
      if (log.isRecord) {
        this.repository.save(this.mapper.map(log, LogEntity))
          .then((result: any) => {
            resolve(result)
          })
          .catch((error: any) => {
            reject(error)
          });
      }
    });
  }

  info(source: string, code: HttpCode, msg: string, obj: string): Promise<any> {
    return new Promise((resolve) => {
      const _log = new LogModel();
      _log.source = source;
      _log.code = code;
      _log.message = msg;
      _log.obj = obj;
      _log.level = LogLevel.INFO;
      _log.isRecord = IsInfo;

      this.save(_log)
        .then(() => resolve(_log.message))
        .catch((error: any) => resolve(error));
    });
  }

  warn(source: string, code: HttpCode, msg: string, obj: string): Promise<any> {
    return new Promise((resolve) => {
      const _log = new LogModel();
      _log.source = source;
      _log.code = code;
      _log.message = msg;
      _log.obj = obj;
      _log.level = LogLevel.WARNING;
      _log.isRecord = IsWarn;

      this.save(_log)
        .then(() => resolve(_log.message))
        .catch((error: any) => resolve(error));
    });
  }

  error(source: string, code: HttpCode, msg: string, obj: string): Promise<any> {
    return new Promise((resolve) => {
      const _log = new LogModel();
      _log.source = source;
      _log.code = code;
      _log.message = msg;
      _log.obj = obj;
      _log.level = LogLevel.ERROR;
      _log.isRecord = IsError;

      this.save(_log)
        .then(() => resolve(_log.message))
        .catch((error: any) => resolve(error));
    });
  }

  critical(source: string, code: HttpCode, msg: string, obj: any): Promise<any> {
    return new Promise((resolve) => {
      const _log = new LogModel();
      _log.source = source;
      _log.code = code;
      _log.message = msg;
      _log.obj = obj;
      _log.level = LogLevel.CRITICAL;
      _log.isRecord = IsCrit;

      this.save(_log)
        .then(() => resolve(_log.message))
        .catch((error: any) => resolve(error));
    });
  }

  default(source: string, code: HttpCode, level: LogLevel, msg: string): Promise<any> {
    return new Promise((resolve) => {
      const _log = new LogModel();
      _log.source = source;
      _log.code = code;
      _log.message = msg;
      _log.level = LogLevel.UNKNOWN;
      _log.isRecord = IsUnkn;

      this.save(_log)
        .then(() => resolve(_log.message))
        .catch((error: any) => resolve(error));
    });
  }

}