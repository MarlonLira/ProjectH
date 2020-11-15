import { CryptoType } from '../enums/cryptoType';
import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcryptjs';

export class Crypto {

  static readonly cryptographyData = {
    algorithm: "aes256",
    coding: "utf8",
    secret: "|*#5522&*QWE?/",
    type: "hex"
  };

  static encrypt(value: string, cryptoType: CryptoType): string {
    switch (cryptoType) {
      case CryptoType.PASSWORD:
        return this.encryptPassword(value);
      case CryptoType.CARD: {
        return this.encryptDefault(value);
      }
      default: {
        return this.encryptDefault(value);
      }
    }
  }

  static decrypt(value: string, cryptoType: CryptoType): string {
    switch (cryptoType) {
      case CryptoType.PASSWORD:
        throw new Error("Method not implemented.");
      case CryptoType.CARD: {
        return this.decryptCard(value);
      }
      default: {
        break;
      }
    }
  }

  private static encryptDefault = (card: string) => CryptoJS.AES.encrypt(card, Crypto.cryptographyData.secret).toString();

  private static decryptCard = (hash: string): string => CryptoJS.AES.decrypt(hash, Crypto.cryptographyData.secret).toString(CryptoJS.enc.Utf8);

  private static encryptPassword = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  static compare = (password: string, hash: string): boolean => hash ? bcrypt.compareSync(password, hash) : false;

  static generateRandomPassword = (): string => CryptoJS.randomBytes(5).toString('hex');

  static randomToken(length: number): string {
    let text = "";
    let count = Math.round(length/3);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const withSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@!%&*";

    for (let i = 0; i < count; i++)
      text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    for (let i = 0; i < count; i++)
      text += numbers.charAt(Math.floor(Math.random() * numbers.length));

    for (let i = 0; i < count; i++)
      text += withSymbols.charAt(Math.floor(Math.random() * withSymbols.length));

    return text.toUpperCase();
  }
}
