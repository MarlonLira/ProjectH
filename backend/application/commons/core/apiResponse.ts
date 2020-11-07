export class ApiResponse {
  code: number;
  codeMessage: string;
  message: string;
  result: any;

  constructor(json?: any) {
    if (json) {
      this.code = json.code;
      this.message = json.message;
      this.result = json.result;
    }
  }
}