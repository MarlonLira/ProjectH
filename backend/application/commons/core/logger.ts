import { dateTimeNow } from "./innerDate";
import * as clc from 'cli-color';
import { LogLevel } from "../enums/log-level";
import { LogModel } from "../../models/log.model";

const error = clc.red.bold;
const warn = clc.yellow.bold;
const crit = clc.magenta.bold;
const info = clc.blue.bold;
const unkn = clc.cyan.bold;

export class Logger {

  static Info(entity: any, message: string) {
    const name = entity.constructor.name;
    // tslint:disable-next-line: no-console
    console.log(info(`${dateTimeNow()} INFO [${name === undefined || name === 'String' ? entity : name}] ${message}`));
  }

  static Warn(entity: any, message: string) {
    const name = entity.constructor.name;
    // tslint:disable-next-line: no-console
    console.log(warn(`${dateTimeNow()} WARN [${name === undefined || name === 'String' ? entity : name}] ${message}`));
  }

  static Error(entity: any, message: string) {
    const name = entity.constructor.name;
    // tslint:disable-next-line: no-console
    console.log(error(`${dateTimeNow()} ERROR [${name === undefined || name === 'String' ? entity : name}] ${message}`));
  }

  static Critical(entity: any, message: string) {
    const name = entity.constructor.name;
    // tslint:disable-next-line: no-console
    console.log(crit(`${dateTimeNow()} CRIT [${name === undefined || name === 'String' ? entity : name}] ${message}`));
  }

  static Unknown(entity: any, message: string) {
    const name = entity.constructor.name;
    // tslint:disable-next-line: no-console
    console.log(unkn(`${dateTimeNow()} UNKN [${name === undefined || name === 'String' ? entity : name}] ${message}`));
  }

  static Default(log: LogModel) {
    const _msg  = log.obj ? log.obj : log.message;
    switch (log.level) {
      case LogLevel.ERROR:
        return Logger.Error(log.source, _msg);
      case LogLevel.WARNING:
        return Logger.Warn(log.source, _msg);
      case LogLevel.CRITICAL:
        return Logger.Critical(log.source, _msg);
      case LogLevel.UNKNOWN:
        return Logger.Unknown(log.source, _msg);
      case LogLevel.INFO:
        return Logger.Info(log.source, _msg);
      default:
        return Logger.Unknown(log.source, _msg);
    }
  }
}