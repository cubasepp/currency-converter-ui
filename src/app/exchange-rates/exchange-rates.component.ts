import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {ExchangeRatesModel} from '../model/exchange-rates.model';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
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
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(128,255,0,0.28)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,128,0,0.28)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.28)',
    }
  ];

  lineChartLegend = true;
  lineChartType = 'line';

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.drawChart();
  }

  private drawChart() {
    this.apiService.getExchangeRates().subscribe((response: ExchangeRatesModel) => {
      this.lineChartLabels = response.labels;
      this.lineChartData = response.data;
      this.chartReady = true;
    });


  }

}
