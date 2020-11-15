import { Response, Request } from "express";
import { inject } from "inversify";
import { controller, httpPost, httpDelete, request, response, httpPut, httpGet } from "inversify-express-utils";

import { Http } from "../../application/commons/core/http";
import { HttpCode } from "../../application/commons/enums/httpCode";
import { HttpMessage } from "../../application/commons/enums/httpMessage";
import { IAddressService } from "../../application/interfaces/address-service.interface";
import { AddressModel } from "../../application/models/address.model";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";

@controller('')
export class AddressController {
  constructor(@inject(TYPES.IAddressService) private service: IAddressService) { }

  @httpPost('/address')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new AddressModel(req.body))
        .then((result: AddressModel) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Address', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Address')));
    });
  }

  @httpPut('/address')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new AddressModel(req.body))
        .then((result: any) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Address', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Address')));
    });
  }

  @httpDelete('/address/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(req.params.id)
        .then((result: any) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Address', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Address')));
    });
  }

  @httpGet('/address/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: any) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Address', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Address')));
    });
  }

  @httpGet('/address/user/:userId')
  getByUserId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByUserId(Number(req.params.userId))
        .then((result: any) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Address', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Address')));
    });
  }

}