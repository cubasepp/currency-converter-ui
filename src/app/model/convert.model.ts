import {ExchangeRateModel} from './exchange-rate.model';

export class ConvertModel {
  convertedAmount: number;
  exchangeRates: ExchangeRateModel[];

  constructor(convertedAmount: number, exchangeRates: ExchangeRateModel[]) {
    this.convertedAmount = convertedAmount;
    this.exchangeRates = exchangeRates;
  }
}
