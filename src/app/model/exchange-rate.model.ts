export class ExchangeRateModel {
  rate: number;
  date: Date;

  constructor(rate: number, date: Date) {
    this.rate = rate;
    this.date = date;
  }
}
