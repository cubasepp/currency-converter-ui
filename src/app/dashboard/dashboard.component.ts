import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConvertOptions} from '../interface/convert-options';
import {ConvertService} from '../services/convert.service';
import {ConvertModel} from '../model/convert.model';
import {debounceTime} from 'rxjs/operators';

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
      amount: ['0', Validators.required],
      option: [this.convertOptions.find(e => !!e), Validators.required]
    });
    this.onChangeAmount();
  }

  ngOnInit(): void {
  }

  convertAmount() {
    this.convertService.convertAmout(
      this.exchangeForm.get('amount').value,
      this.exchangeForm.get('option').value.from_currency,
      this.exchangeForm.get('option').value.to_currency)
      .subscribe(data => {
        this.convertModel = data;
      });
  }

  onChangeAmount() {
    this.exchangeForm.get('amount').valueChanges
      .pipe(debounceTime(400))
      .subscribe(() => {
        this.convertAmount();
      });
  }

}
