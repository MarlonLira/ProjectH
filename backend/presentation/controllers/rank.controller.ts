import { Response, Request } from "express";
import { inject } from "inversify";
import { controller, request, response, httpGet } from "inversify-express-utils";

import { Http } from "../../application/commons/core/http";
import { HttpCode } from "../../application/commons/enums/httpCode";
import { HttpMessage } from "../../application/commons/enums/httpMessage";
import { IRankService } from "../../application/interfaces/rank-service.interface";
import { RankModel } from "../../application/models/rank.model";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";

@controller('')
export class RankController {
  constructor(@inject(TYPES.IRankService) private service: IRankService) { }

  @httpGet('/rank/score/:score')
  getbyScore(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByScore(Number(req.params.score))
        .then((result: RankModel) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Rank', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Rank')));
    });
  }

  @httpGet('/rank/name/:name')
  getbyName(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByName(String(req.params.name))
        .then((result: RankModel) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Rank', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Rank')));
    });
  }

  @httpGet('/rank/:id')
  getbyId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: RankModel) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Rank', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Rank')));
    });
  }
}