import { Attributes } from './attributes';

class InnerDate {
  public day!: string;
  public month!: string;
  public year!: string;
  public hours!: string;
  public minutes!: string;
  public seconds!: string;
  public shortDate!: string;
  public fullDate!: string;
  public _isValidDate!: boolean;

  convertToString(fullDate?: string) {
    this._isValidDate = true;
    const datePart = Attributes.isValid(fullDate) ? fullDate.split('-') : undefined;

    if (Attributes.isValid(datePart)) {
      this.year = leftZero(datePart[0]);
      this.month = leftZero(datePart[1]);
      this.day = leftZero(datePart[2]);
      this.fullDate = fullDate;
    } else {
      this._isValidDate = false;
    }
  }

  convertToDateTime(_date: Date): InnerDate {
    this.year = leftZero(_date.getFullYear());
    this.month = leftZero(_date.getMonth() + 1);
    this.day = leftZero(_date.getDate());
    this.hours = leftZero((_date.getUTCHours() === 1 || _date.getUTCHours() === 2) ? 24 - (3 - _date.getUTCHours()) : _date.getUTCHours() - 3);
    this.minutes = leftZero(_date.getUTCMinutes());
    this.seconds = leftZero(_date.getUTCSeconds());
    this.fullDate = `${this.year}-${this.month}-${this.day} ${this.hours}:${this.minutes}:${this.seconds}`;
    this.shortDate = `${this.year}-${this.month}-${this.day}`;
    return (this);
  }

  getFullDate() {
    return this._isValidDate ? `${this.year}-${this.month}-${this.day}` : undefined;
  }

  public now() {
    const _date = new Date();
    this.year = leftZero(_date.getFullYear());
    this.month = leftZero(_date.getMonth() + 1);
    this.day = leftZero(_date.getDay());
    this.fullDate = `${this.year}-${this.month}-${this.day}`;
    return `${this.year}-${this.month}-${this.day}`;
  }
}

function dateNow() {
  const _date = new Date();
  const Year = leftZero(_date.getFullYear());
  const Month = leftZero(_date.getMonth() + 1);
  const Day = leftZero(_date.getDay());
  return `${Year}-${Month}-${Day}`;
}

function dateTimeNow() {
  const _date = new Date();

  const day = _date.getDate();           // 1-31
  const month = _date.getMonth();          // 0-11 (zero=janeiro)
  const year = _date.getFullYear();       // 4 dígitos
  const hours = _date.getHours();          // 0-23
  const minutes = _date.getMinutes();        // 0-59
  const seconds = _date.getSeconds();        // 0-59

  const fullDate = `${year}-${leftZero((month + 1))}-${leftZero(day)}`;
  const fullHour = `${leftZero(hours)}:${leftZero(minutes)}:${leftZero(seconds)}`;

  return `${fullDate} ${fullHour}`;
}

function convertToDateTime(_date: Date): string {
  const Year = leftZero(_date.getFullYear());
  const Month = leftZero(_date.getMonth() + 1);
  const Day = leftZero(_date.getDate());
  const hours = leftZero((_date.getUTCHours() === 1 || _date.getUTCHours() === 2) ? 24 - (3 - _date.getUTCHours()) : _date.getUTCHours() - 3);
  const minutes = leftZero(_date.getUTCMinutes());
  const seconds = leftZero(_date.getUTCSeconds());
  const build = `${Year}-${Month}-${Day} ${hours}:${minutes}:${seconds}`;
  return build;
}

function leftZero(value: any) {
  let result: string = ' ';
  if (value !== undefined && value != null) {
    result = value.toString();
    if (value.toString().length === 1) {
      result = `0${value.toString()}`;
    }
  }
  return result;
}

export { InnerDate, dateNow, dateTimeNow, convertToDateTime };