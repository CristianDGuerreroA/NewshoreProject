import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryDataFormComponent } from './components/entry-data-form-component/entry-data-form.component';
import { FlightService } from '../../services/consume-api/get-flights-api.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [EntryDataFormComponent],
  providers: [FlightService],
  exports: [EntryDataFormComponent]
})

export class EntryDataFormModule { }
