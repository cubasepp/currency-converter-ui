import {ChartDataSets} from 'chart.js';

export class ExchangeRatesModel {
  labels: string[];
  data: ChartDataSets[];

  constructor(labels: any, data: ChartDataSets[]) {
    this.labels = labels;
    this.data = data;
  }
}
