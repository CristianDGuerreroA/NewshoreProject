import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/core/services/get-data-routes-api.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Flight } from 'src/app/core/models/Flight';
import { Journey } from 'src/app/core/models/Journey';
import { CurrencyService } from 'src/app/core/services/change-currency-api.service';

@Component({
  selector: 'app-entry-data-form',
  templateUrl: 'templates/entry-data-form.component.html',
  styleUrls: ['styles/entry-data-form.component.css'],
})
export class EntryDataFormComponent implements OnInit {
  origin: string = '';
  destination: string = '';
  maxFlights: number = 1; // Configura el número máximo de vuelos permitidos en la ruta (valor predeterminado)
  route: any;
  searchPerformed: boolean = false;
  flights: any[];
  journey: Journey | null = null;

  selectedCurrency: string = 'USD';
  currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY'];

  ngOnInit(): void {
  }

  constructor(private flightService: FlightService, private currencyService: CurrencyService) {}



  onSubmit(): void {
    if (this.origin.length < 3 || this.destination.length < 3) {
      this.showToast('Los códigos de origen y destino deben tener 3 caracteres', 'error');
      return;
    }

    if (this.origin === this.destination) {
      this.showToast('El origen y destino deben ser distintos', 'error');
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
          this.showToast('No se ha encontrado ninguna ruta', 'error');
        }
      },
      error => {
        this.showToast('Error al obtener vuelos', 'error');
      }
    );
  }

  calculateRoute(flights: Flight[], origin: string, destination: string, maxFlights: number): any {
    const visited = new Set<string>();
    const route = this.dfsSearch(origin, destination, maxFlights, visited, flights);
    return route;
  }

  private dfsSearch(
    currentStation: string,
    destination: string,
    maxFlights: number,
    visited: Set<string>,
    flights: Flight[]
  ): any {
    if (currentStation === destination) {
      return { flights: [], price: 0 };
    }

    if (maxFlights === 0) {
      this.showToast('No se ha podido calcular la ruta de acuerdo al numero de vuelos', 'error');
      return null;
    }

    visited.add(currentStation);

    for (const flight of flights) {
      if (!visited.has(flight.destination) && flight.origin === currentStation) {
        const remainingFlights = this.dfsSearch(
          flight.destination,
          destination,
          maxFlights - 1,
          visited,
          flights
        );

        if (remainingFlights !== null) {
          return {
            flights: [flight, ...remainingFlights.flights],
            price: flight.price + remainingFlights.price
          };
        }
      }
    }

    visited.delete(currentStation);
    return null;
  }

  onInputToUpper(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();
  }


  onCurrencyChange(event: any): void {

    this.selectedCurrency = event.target.value;
    this.convertRouteToSelectedCurrency();

  }

  convertRouteToSelectedCurrency(): void {
    if (this.journey) {
      this.currencyService.getExchangeRates(this.selectedCurrency).subscribe(
        rates => {
          if(this.journey !== null){
            this.journey.price = this.currencyService.convertCurrency(this.journey.price, 'USD', this.selectedCurrency, rates.rates);
            this.journey.flights.forEach(flight => {
              flight.price = this.currencyService.convertCurrency(flight.price, 'USD', this.selectedCurrency, rates.rates);
            });
          }
        },
        error => {
          console.error('Error al obtener las tasas de cambio:', error);
        }
      );
    }
  }


  showToast(text: string, icon: SweetAlertIcon): void {
    Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
    }).fire({
      icon: icon,
      title: text,
    });
  }
}
