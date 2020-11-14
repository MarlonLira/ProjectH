import { RankModel } from "../models/rank.model";

export interface IRankService {
  getByScore(score: number): Promise<RankModel>
  getById(id: number): Promise<RankModel>
  getByName(name: string): Promise<RankModel>
}