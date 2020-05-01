import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ExchangeRatesComponent} from './exchange-rates/exchange-rates.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'exchange-rates', component: ExchangeRatesComponent },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
