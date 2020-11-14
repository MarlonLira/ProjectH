export class Json {
  static parse = (value: any) => JSON.parse(JSON.stringify(value));
}