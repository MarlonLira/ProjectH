import { injectable } from "inversify";
import { Op } from "sequelize";
import { TransactionType } from "../../../application/commons/enums/transactionType";
import { RankDAO, RankEntity } from "../../../domain/entities/rank.entity";
import { IRankRepository } from "../../../domain/interfaces/rank-repository.interface";

@injectable()
export class RankRepository implements IRankRepository {

  getByScore(score: number): Promise<RankEntity> {
    return new Promise((resolve, reject) => {
      RankDAO.findOne({
        where: {
          maxScore: { [Op.gte]: score },
          minScore: { [Op.lte]: score },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(new RankEntity(result)))
        .catch((error: any) => reject(error));
    });
  }

  getById(id: number): Promise<RankEntity> {
    return new Promise((resolve, reject) => {
      RankDAO.findByPk(id)
        .then((result: any) => resolve(new RankEntity(result)))
        .catch((error: any) => reject(error));
    });
  }

  getByName(name: string): Promise<RankEntity> {
    return new Promise((resolve, reject) => {
      RankDAO.findOne({
        where: {
          name: { [Op.like]: `%${name}` },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(new RankEntity(result)))
        .catch((error: any) => reject(error));
    });
  }
}