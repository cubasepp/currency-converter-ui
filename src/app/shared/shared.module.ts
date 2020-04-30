import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';


@NgModule({
  declarations: [],
  exports: [MaterialModule],
  imports: [
    MaterialModule,
  ],
  providers: []
})
export class SharedModule {
}
