import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalcPriceComponent } from './core/modules/calc-price/components/calc-price.component';
import { EntryDataFormComponent } from './core/modules/entry-data-form/components/entry-data-form-component/entry-data-form.component';
import { ShowDataRouteComponent } from './core/modules/show-data-route/components/show-data-route.component';
import { CalcPriceModule } from './core/modules/calc-price/calc-price.module';
import { ShowDataRouteModule } from './core/modules/show-data-route/show-data-route.module';
import { HttpClientModule } from '@angular/common/http';
import { EntryDataFormModule } from './core/modules/entry-data-form/entry-data-form.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalcPriceModule,
    EntryDataFormModule,
    ShowDataRouteModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
