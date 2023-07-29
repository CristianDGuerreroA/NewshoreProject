import { Component } from '@angular/core';
import { FlightService } from 'src/app/core/services/consume-api/get-flights-api.service';
import { ShowToastAlertsService } from 'src/app/core/services/alerts/show-toast-alerts.service';
import { GenerateRoutesService } from 'src/app/core/services/algorithms/generate-routes.service';
import { Flight } from 'src/app/core/models/Flight';
import { Journey } from 'src/app/core/models/Journey';

@Component({
  selector: 'app-entry-data-form',
  templateUrl: 'templates/entry-data-form.component.html',
  styleUrls: ['styles/entry-data-form.component.css'],
})
export class EntryDataFormComponent  {
  origin: string = '';
  destination: string = '';
  maxFlights: number = 10; 
  route: any;
  searchPerformed: boolean = false;
  flights: any[];
  journey: Journey | null = null;
  selectedCurrency: string = 'USD';

  constructor(private flightService: FlightService, private generateRoutesService:GenerateRoutesService, private showToastAlertsService:ShowToastAlertsService) {}



  onSubmit(): void {
    if (this.origin.length < 3 || this.destination.length < 3) {
      this.showToastAlertsService.showToast('Los códigos de origen y destino deben tener 3 caracteres', 'error');
      return;
    }

    if (this.origin === this.destination) {
      this.showToastAlertsService.showToast('El origen y destino deben ser distintos', 'error');
      return;
    }

    this.searchPerformed = true;
    this.getRoute();
  }

  getRoute(): void {
    this.flightService.getFlights().subscribe(
      flights => {
        this.origin = this.origin.toUpperCase();
        this.destination = this.destination.toUpperCase();
        const route = this.calculateRoute(flights, this.origin, this.destination, this.maxFlights);
        if (route) {
          this.journey = {
            origin: this.origin,
            destination: this.destination,
            price: route.price,
            flights: route.flights
          };
        } else {
          this.journey = null;
          this.showToastAlertsService.showToast('No se ha encontrado ninguna ruta', 'error');
        }
      },
      error => {
        this.showToastAlertsService.showToast('Error al obtener vuelos', 'error');
      }
    );
  }

  calculateRoute(flights: Flight[], origin: string, destination: string, maxFlights: number): any {
    const visited = new Set<string>();
    const route = this.generateRoutesService.dfsSearch(origin, destination, maxFlights, visited, flights);
    return route;
  }

  onInputToUpper(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();
  }

}
