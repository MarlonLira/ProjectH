import { Response, Request } from "express";
import { inject } from "inversify";
import { controller, httpPost, httpDelete, request, response, httpPut, httpGet } from "inversify-express-utils";

import { Http } from "../../application/commons/core/http";
import { HttpCode } from "../../application/commons/enums/httpCode";
import { HttpMessage } from "../../application/commons/enums/httpMessage";
import { IUserService } from "../../application/interfaces/user-service.interface";
import { UserModel } from "../../application/models/user.model";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";

@controller('')
export class UserController {
  constructor(@inject(TYPES.IUserService) private service: IUserService) { }

  @httpPost('/user')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new UserModel(req.body))
        .then((result: UserModel) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'User', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'User')));
    });
  }

  @httpPut('/user')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new UserModel(req.body))
        .then((result: any) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'User', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'User')));
    });
  }

  @httpDelete('/user/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(req.params.id)
        .then((result: any) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'User', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'User')));
    });
  }

  @httpGet('/user/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: any) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Found, 'User', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'User')));
    });
  }

  @httpPost('/user/signin')
  signin(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.signin(new UserModel(req.body))
        .then((result: UserModel) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Login_Authorized, 'User', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'User')));
    });
  }

}