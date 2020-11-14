import { PointModel } from "../models/point.model";

export interface IPointService {
  save(product: PointModel): Promise<PointModel>;
  update(product: PointModel): Promise<any>;
  getById(id: number): Promise<PointModel>;
  delete(id: number): Promise<any>;
  toList(): Promise<PointModel[]>;
}