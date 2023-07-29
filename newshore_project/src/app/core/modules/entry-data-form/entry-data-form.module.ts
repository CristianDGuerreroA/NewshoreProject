import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryDataFormComponent } from './components/entry-data-form-component/entry-data-form.component';
import { FlightService } from '../../services/consume-api/get-flights-api.service';
import { FormsModule } from '@angular/forms';
import { RouteDetailsComponent } from './components/route-details-component/route-details.component';
import { CurrencySelectorComponent } from './components/currency-selector-component/currency-selector.component';


@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [EntryDataFormComponent, RouteDetailsComponent, CurrencySelectorComponent],
  providers: [FlightService],
  exports: [EntryDataFormComponent, RouteDetailsComponent, CurrencySelectorComponent]
})

export class EntryDataFormModule { }
