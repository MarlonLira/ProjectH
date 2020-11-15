/**
 * @description
 * @enum {number}
 */
export enum TransactionType {
  ACTIVE = 'AT',
  PENDING = 'PD',
  DELETED = 'EX',
  IN_SCREENING = 'IS',
  REJECTED = 'RJ',
  AWAITING_COLLECTION = 'AC',
  CONCLUDED = 'CC'
}