import { DonationModel } from "../models/donation.model";

export interface IDonationService {
  save(product: DonationModel): Promise<DonationModel>;
  update(product: DonationModel): Promise<any>;
  getById(id: number): Promise<DonationModel>;
  delete(id: number): Promise<any>;
  toList(): Promise<DonationModel[]>;
}