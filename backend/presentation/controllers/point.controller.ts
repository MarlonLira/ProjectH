import { Response, Request } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";

import { Http } from "../../application/commons/core/http";
import { HttpCode } from "../../application/commons/enums/httpCode";
import { HttpMessage } from "../../application/commons/enums/httpMessage";
import { IPointService } from "../../application/interfaces/point-service.interface";
import { PointModel } from "../../application/models/point.model";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";

@controller('')
export class PointController {
  constructor(@inject(TYPES.IPointService) private service: IPointService) { }

  @httpPost('/point')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new PointModel(req.body))
        .then((result: PointModel) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Point', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Point')));
    });
  }

  @httpPut('/point')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      console.log(req.body);
      this.service.update(req.body)
        .then((result: any) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Point', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Point')));
    });
  }

  @httpGet('/point/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(req.params.id)
        .then((result: PointModel) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Point', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Point')));
    });
  }

  @httpGet('/points')
  getAll(@response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.toList()
        .then((result: PointModel[]) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Point', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Point')));
    });
  }

  @httpDelete('/point/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(req.params.id)
        .then((result: any) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Point', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Point')));
    });
  }
}