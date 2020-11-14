import { RankEntity } from "../entities/rank.entity";

export interface IRankRepository {
  getByScore(score: number): Promise<RankEntity>
  getById(id: number): Promise<RankEntity>
  getByName(name: string): Promise<RankEntity>
}