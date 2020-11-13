import { LogEntity } from "../entities/log.entity";

export interface ILogRepository {
  save(log: LogEntity): Promise<any>;
}