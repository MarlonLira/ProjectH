import { PointEntity } from "../entities/point.entity";

export interface IPointRepository {
  save(product: PointEntity): Promise<PointEntity>;
  update(product: PointEntity): Promise<any>;
  getById(id: number): Promise<PointEntity>;
  delete(id: number): Promise<any>;
  toList(): Promise<PointEntity[]>;
}