import { Response } from "express";
import { HttpCode } from '../enums/httpCode';
import { HttpMessage } from "../enums/httpMessage";
import { ApiResponse } from "./apiResponse";

export class Http {

  static sendMessage(res: Response, code: HttpCode, msg: HttpMessage, entity: string, result = null) {
    return res.status(code).send(this.buildMessage(code, entity, msg, result));
  }

  static sendErrorMessage(res, error: HttpMessage, entity) {
    switch (error) {
      case HttpMessage.Parameters_Not_Provided:
        return Http.sendMessage(res, HttpCode.Bad_Request, error, entity);
      case HttpMessage.Login_Unauthorized:
        return Http.sendMessage(res, HttpCode.Unauthorized, error, entity);
      case HttpMessage.Not_Found:
        return Http.sendMessage(res, HttpCode.Not_Found, error, entity);
      case HttpMessage.Already_Exists:
        return Http.sendMessage(res, HttpCode.Bad_Request, error, entity);
      case HttpMessage.Request_Unauthorized:
        return Http.sendMessage(res, HttpCode.Unauthorized, error, entity);
      case HttpMessage.Request_Forbidden:
        return Http.sendMessage(res, HttpCode.Forbidden, error, entity);
      default:
        return Http.sendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, entity, error);
    }
  }

  static sendSimpleMessage(res: Response, code: HttpCode, json: any) {
    return res.status(code).send(json);
  }

  private static buildMessage(value: HttpCode, entity: string, msg: HttpMessage, _result = null) {
    return new ApiResponse({
      code: value,
      codeMessage: HttpCode[value],
      message: `${entity} - ${msg}`,
      result: _result
    });
  }
}