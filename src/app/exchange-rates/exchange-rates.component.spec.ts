import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExchangeRatesComponent} from './exchange-rates.component';
import {ApiService} from '../services/api.service';
import {HttpClientModule} from '@angular/common/http';

describe('ExchangeRatesComponent', () => {
  let component: ExchangeRatesComponent;
  let fixture: ComponentFixture<ExchangeRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeRatesComponent],
      imports: [HttpClientModule],
      providers: [ApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
