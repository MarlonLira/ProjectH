import { DonationEntity } from "../entities/donation.entity";

export interface IDonationRepository {
  save(product: DonationEntity): Promise<DonationEntity>;
  update(product: DonationEntity): Promise<any>;
  getById(id: number): Promise<DonationEntity>;
  delete(id: number): Promise<any>;
  toList(): Promise<DonationEntity[]>;
}