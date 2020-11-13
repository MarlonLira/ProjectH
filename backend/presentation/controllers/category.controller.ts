import { Response, Request } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";

import { Http } from "../../application/commons/core/http";
import { HttpCode } from "../../application/commons/enums/httpCode";
import { HttpMessage } from "../../application/commons/enums/httpMessage";
import { ICategoryService } from "../../application/interfaces/category-service.interface";
import { CategoryModel } from "../../application/models/category.model";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";

@controller('')
export class CategoryController {
  constructor(@inject(TYPES.ICategoryService) private service: ICategoryService) { }

  @httpPost('/category')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new CategoryModel(req.body))
        .then((result: CategoryModel) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Category', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Category')));
    });
  }

  @httpPut('/category')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new CategoryModel(req.body))
        .then((result: any) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Category', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Category')));
    });
  }

  @httpGet('/category/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(req.params.id)
        .then((result: CategoryModel) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Category', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Category')));
    });
  }

  @httpGet('/categories')
  getAll(@response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.toList()
        .then((result: CategoryModel[]) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Category', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Category')));
    });
  }

  @httpDelete('/category/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(req.params.id)
        .then((result: any) => resolve(Http.sendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Category', result)))
        .catch((error: any) => resolve(Http.sendErrorMessage(res, error, 'Category')));
    });
  }
}