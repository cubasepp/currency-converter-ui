import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ConvertModel} from '../model/convert.model';
import {map} from 'rxjs/operators';
import {ExchangeRateModel} from '../model/exchange-rate.model';
import {ExchangeRatesModel} from '../model/exchange-rates.model';
import {ChartDataSets} from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  convertAmout(amount: number, fromCurrency: string, toCurrency: string) {
    const params = new HttpParams()
      .set('cents', (amount * 100).toString()) // convert euro in cents
      .set('from_currency', fromCurrency)
      .set('to_currency', toCurrency);

    return this.httpClient.get<ConvertModel>(`${environment.apiUrl}/api/convert.json`, {params})
      .pipe(map((data: any) =>
        new ConvertModel(
          data.converted_amount,
          data.exchange_rates.map(res => new ExchangeRateModel(res.rate, res.date))
        )
      ));
  }

  getExchangeRates() {
    return this.httpClient.get<ExchangeRatesModel>(`${environment.apiUrl}/api/exchange_rates.json`)
      .pipe(map((data: any) =>
        new ExchangeRatesModel(
          data.labels,
          data.data.map(res => <ChartDataSets> {label: res.label, data: res.data})
        )
      ));
  }
}
