import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';

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
    this.apiService.getExchangeRates().subscribe((data) => {
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        this.lineChartLabels.push(date.toLocaleDateString());
      }
      for (const [key, value] of Object.entries(data)) {
        this.lineChartData.push({data: value.map(x => x.rate).reverse(), label: key});
      }
      this.chartReady = true;
    });


  }

}
