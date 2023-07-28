import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/core/services/get-data-routes-api.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Flight } from 'src/app/core/models/Flight';

@Component({
  selector: 'app-entry-data-form',
  templateUrl: 'templates/entry-data-form.component.html',
  styleUrls: ['styles/entry-data-form.component.css'],
})
export class EntryDataFormComponent implements OnInit{
  origin: string = '';
  destination: string = '';
  maxFlights: number = 1; // Configura el número máximo de vuelos permitidos en la ruta (valor predeterminado)
  route: Flight[] | null = null;
  searchPerformed: boolean = false;
  flights: Flight[];

  ngOnInit(): void {
    this.getFlightsFromApi();
  }

  constructor(private flightService: FlightService) { }

  onSubmit(): void {
    if (this.origin === this.destination) {
      error: () => this.showToast('El origen y destino deben ser distintos', 'error')
    }

    this.searchPerformed = true;
    this.route = this.buildRoute();
  }

  buildRoute(): any {
    const flights = this.flights; // Obtener los vuelos de manera síncrona (sugerencia)

    // Función recursiva para construir la ruta
    const findRoute = (currentOrigin: string, currentRoute: Flight[]): Flight[] | null => {
      if (currentRoute.length === this.maxFlights) {
        // Se alcanzó el número máximo de vuelos permitidos en la ruta
        return null;
      }

      const lastFlight = currentRoute.length > 0 ? currentRoute[currentRoute.length - 1] : null;

      const nextFlight = flights.find(flight =>
        flight.origin === lastFlight?.destination && flight.destination === this.destination
      );

      if (nextFlight) {
        currentRoute.push(nextFlight);
        return currentRoute;
      }

      for (const flight of flights) {
        if (flight.origin === currentOrigin && !currentRoute.includes(flight)) {
          const updatedRoute = [...currentRoute, flight];
          const routeFound = findRoute(flight.destination, updatedRoute);
          if (routeFound) {
            return routeFound;
          }
        }
      }

      return null;
    };

    const routeFlights = findRoute(this.origin, []);

    if (routeFlights) {
      const journey = {
        Journey: {
          Origin: this.origin,
          Destination: this.destination,
          Price: routeFlights.reduce((totalPrice, flight) => totalPrice + flight.price, 0),
          Flights: routeFlights.map(flight => flight.toJson())
        }
      };
      return JSON.stringify(journey, null, 2);
    } else {
      return null;
    }
  }

  onInputToUpper(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();
  }

  getFlightsFromApi(): void {
    this.flightService.getFlights().subscribe(
      flights => {
        this.flights = flights;
        console.log(this.flights);
        // Aquí puedes realizar cualquier lógica adicional con los datos de los vuelos
      },
      error => {
        error: () => this.showToast('Error al obtener vuelos', 'error')
      }
    );
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
