export class Json {
  static parse = (value: any) => Array.isArray(value) ? JSON.parse(JSON.stringify(value)) : value.toJSON();
}