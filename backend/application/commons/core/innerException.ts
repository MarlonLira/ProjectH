import { Attributes } from "./attributes";

export class InnerException {
  static decode = (obj: object): string => Attributes.isValid(JSON.stringify(obj)) ? String(obj) : JSON.stringify(obj);
}