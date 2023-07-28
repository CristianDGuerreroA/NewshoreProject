import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDataRouteComponent } from './components/show-data-route.component';
import { JsonViewDataComponent } from './components/json-view-data/json-view-data.component';
import { TableRouteDataComponent } from './components/table-route-data/table-route-data.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShowDataRouteComponent, JsonViewDataComponent, TableRouteDataComponent],
  exports: [ShowDataRouteComponent]
})
export class ShowDataRouteModule { }
