import { Response, Request } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";

import { Http } from "../../application/commons/core/http";
import { HttpCode } from "../../application/commons/enums/httpCode";
import { HttpMessage } from "../../application/commons/enums/httpMessage";
import { IDonationService } from "../../application/interfaces/donation-service.interface";
import { DonationModel } from "../../application/models/donation.model";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";

@controller('')
export class DonationController {
  constructor(@inject(TYPES.IDonationService) private service: IDonationService) { }

  @httpPost('/donation')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new DonationModel(req.body))
        .then((result: DonationModel) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Donation', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Donation')));
    });
  }

  @httpPut('/donation')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(req.body)
        .then((result: any) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Donation', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Donation')));
    });
  }

  @httpGet('/donation/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(req.params.id)
        .then((result: DonationModel) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Donation', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Donation')));
    });
  }

  @httpGet('/donations')
  getAll(@response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.toList()
        .then((result: DonationModel[]) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Donation', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Donation')));
    });
  }

  @httpDelete('/donation/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(req.params.id)
        .then((result: any) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Donation', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Donation')));
    });
  }
}