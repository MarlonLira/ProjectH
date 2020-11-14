import { AutoMap } from '@nartc/automapper';
import { Json } from '../../application/commons/core/json';
import { TransactionType } from "../../application/commons/enums/transactionType";
import { RankMapping } from '../../infrastructure/data/mappings/rank.mapping';
import { BaseEntity, BaseEntityDAO, _instance } from './base.entity';

export class RankEntity extends BaseEntity {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public name: string;

  @AutoMap()
  public minScore: number;

  @AutoMap()
  public maxScore: number;

  constructor(json?: any) {
    json = Json.parse(json);
    super(json);
    if (json) {
      this.status = json.status;
      this.name = json.name;
      this.minScore = json.minScore;
      this.maxScore = json.maxScore;
    }
  }
}

export class RankDAO extends BaseEntityDAO { }

RankDAO.init(RankMapping, { sequelize: _instance, tableName: 'rank' });