import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConvertOptions} from '../interface/convert-options';
import {ApiService} from '../services/api.service';
import {ConvertModel} from '../model/convert.model';
import {debounceTime} from 'rxjs/operators';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  exchangeForm: FormGroup;
  convertModel: ConvertModel;

  // Chart configuration
  chartReady = false;
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    }
  ];

  lineChartLegend = true;
  lineChartType = 'line';
  // End chart configuration

  convertOptions: ConvertOptions[] = [
    {description: 'EUR -> USD', from_currency: 'EUR', to_currency: 'USD'},
    {description: 'USD -> EUR', from_currency: 'USD', to_currency: 'EUR'},
    {description: 'EUR -> CHF', from_currency: 'EUR', to_currency: 'CHF'},
    {description: 'CHF -> EUR', from_currency: 'CHF', to_currency: 'EUR'},
  ];

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService) {
    this.exchangeForm = this.formBuilder.group({
      amount: ['1', Validators.required],
      option: [null, Validators.required]
    });
    this.onChangeAmount();
  }

  ngOnInit(): void {

  }

  convertAmount() {
    this.chartReady = false;
    this.lineChartData = [];
    this.apiService.convertAmout(
      this.exchangeForm.get('amount').value * 100, // convert euro in cents
      this.exchangeForm.get('option').value.from_currency,
      this.exchangeForm.get('option').value.to_currency)
      .subscribe((data: ConvertModel) => {
        this.convertModel = data;
        this.lineChartLabels = data.exchangeRates.map(x => new Date(x.date).toLocaleDateString()).reverse();
        this.lineChartData.push({data: data.exchangeRates.map(x => x.rate).reverse(), label: ''});
        this.chartReady = true;
      });
  }

  onChangeAmount() {
    this.exchangeForm.get('amount').valueChanges
      .pipe(debounceTime(400))
      .subscribe(() => {
        if (this.exchangeForm.get('option').value !== null) {
          this.convertAmount();
        }
      });
  }
}
