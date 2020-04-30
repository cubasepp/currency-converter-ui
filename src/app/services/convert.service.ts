import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ConvertModel} from '../model/convert.model';
import {map} from 'rxjs/operators';
import {ExchangeRateModel} from '../model/exchange-rate.model';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  constructor(private httpClient: HttpClient) {
  }

  convertAmout(amount: number, fromCurrency: string, toCurrency: string) {
    const params = new HttpParams()
      .set('amount', amount.toString())
      .set('from_currency', fromCurrency)
      .set('to_currency', toCurrency);

    return this.httpClient.get<ConvertModel>(`${environment.apiUrl}/convert.json`, {params})
      .pipe(map((data: any) =>
        new ConvertModel(
          data.converted_amount,
          data.exchange_rates.map(res => new ExchangeRateModel(res.rate, res.date))
        )
      ));

  }
}
