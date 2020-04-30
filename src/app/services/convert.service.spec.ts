import {inject, TestBed} from '@angular/core/testing';

import {ConvertService} from './convert.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConvertModel} from '../model/convert.model';
import {ExchangeRateModel} from '../model/exchange-rate.model';
import {environment} from '../../environments/environment';

describe('ConvertService', () => {
  let service: ConvertService;

  const exchangeRateModelMock = new ExchangeRateModel(1.03, new Date(2019, 4, 30));
  const convertModelMock = new ConvertModel(20, [exchangeRateModelMock]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ConvertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  afterEach(inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }));


  it('getDesign', inject([HttpTestingController],
    (httpMock: HttpTestingController) => {

      service.convertAmout(10.01, 'EUR', 'USD').subscribe(data => {
        expect(data).toBeInstanceOf(ConvertModel);
        expect(data).toEqual(convertModelMock);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/convert.json?amount=10.01&from_currency=EUR&to_currency=USD`);
      expect(req.request.method).toEqual('GET');
      req.flush(convertModelMock, {status: 200, statusText: 'OK'});
    }));
});
