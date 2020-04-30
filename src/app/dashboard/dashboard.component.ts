import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConvertOptions} from '../interface/convert-options';
import {ConvertService} from '../services/convert.service';
import {ConvertModel} from '../model/convert.model';
import {debounceTime} from 'rxjs/operators';
import * as CanvasJS from '../../assets/canvasjs.min';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  exchangeForm: FormGroup;
  convertModel: ConvertModel;

  convertOptions: ConvertOptions[] = [
    {description: 'EUR -> USD', from_currency: 'EUR', to_currency: 'USD'},
    {description: 'USD -> EUR', from_currency: 'USD', to_currency: 'EUR'},
    {description: 'EUR -> CHF', from_currency: 'EUR', to_currency: 'CHF'},
    {description: 'CHF -> EUR', from_currency: 'CHF', to_currency: 'EUR'},
  ];

  constructor(private formBuilder: FormBuilder,
              private convertService: ConvertService) {
    this.exchangeForm = this.formBuilder.group({
      amount: ['1', Validators.required],
      option: [null, Validators.required]
    });
    this.onChangeAmount();
  }

  ngOnInit(): void {

  }

  convertAmount() {
    const dataPoints = [];
    this.convertService.convertAmout(
      this.exchangeForm.get('amount').value * 100, // convert euro in cents
      this.exchangeForm.get('option').value.from_currency,
      this.exchangeForm.get('option').value.to_currency)
      .subscribe((data: ConvertModel) => {
        this.convertModel = data;
        this.convertModel.exchangeRates.forEach(x => {
          dataPoints.push({y: x.rate, label: x.date.toLocaleString()});
        });
        this.renderChart(dataPoints);
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

  private renderChart(dataPoints) {
    const chart = new CanvasJS.Chart('chartContainer', {
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: false,
      data: [{
        type: 'spline',
        dataPoints
      }]
    });
    chart.render();
  }

}
