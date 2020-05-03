import {inject, TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConvertModel} from '../model/convert.model';
import {ExchangeRateModel} from '../model/exchange-rate.model';
import {environment} from '../../environments/environment';
import {ExchangeRatesModel} from '../model/exchange-rates.model';
import {ChartDataSets} from 'chart.js';

describe('ApiService', () => {
  let service: ApiService;

  const exchangeRateModelMock = new ExchangeRateModel(1.03, new Date(2019, 4, 30));
  const convertModelMock = new ConvertModel(20, [exchangeRateModelMock]);
  const exchangeRatesModelMock = new ExchangeRatesModel(
    ['2020-04-26', '2020-04-27', '2020-04-28', '2020-04-29', '2020-04-30', '2020-05-01', '2020-05-02', '2020-05-03'],
    [<ChartDataSets> {
      label: 'EURUSD',
      data: [1.0915427572076382, 1.09872171377163, 1.0974227799646983, 1.086974027628222, 1.0981772509081626, 1.0942855025936626,
        1.0892357401975405, 1.0834596008000634]
    }]);


  ;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  afterEach(inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }));


  it('converAmoount', inject([HttpTestingController],
    (httpMock: HttpTestingController) => {

      service.convertAmout(10.01, 'EUR', 'USD').subscribe(data => {
        expect(data).toBeInstanceOf(ConvertModel);
        expect(data).toEqual(convertModelMock);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/convert.json?cents=1001&from_currency=EUR&to_currency=USD`);
      expect(req.request.method).toEqual('GET');
      req.flush(convertModelMock, {status: 200, statusText: 'OK'});
    }));

  it('getExchangeRates', inject([HttpTestingController],
    (httpMock: HttpTestingController) => {

      service.getExchangeRates().subscribe(data => {
        expect(data).toBeInstanceOf(ExchangeRatesModel);
        expect(data).toEqual(exchangeRatesModelMock);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/exchange_rates.json`);
      expect(req.request.method).toEqual('GET');
      req.flush(exchangeRatesModelMock, {status: 200, statusText: 'OK'});
    }));
});
