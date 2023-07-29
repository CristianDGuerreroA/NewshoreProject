import { Injectable } from '@angular/core';
import { Flight } from '../../models/Flight';
import { ShowToastAlertsService } from '../alerts/show-toast-alerts.service';

@Injectable({
  providedIn: 'root',
})
export class GenerateRoutesService {
  constructor(private showToastAlertsService:ShowToastAlertsService) {}

  dfsSearch(
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
      this.showToastAlertsService.showToast(
        'No se ha podido calcular la ruta de acuerdo al numero de vuelos',
        'error'
      );
      return null;
    }

    visited.add(currentStation);

    for (const flight of flights) {
      if (
        !visited.has(flight.destination) &&
        flight.origin === currentStation
      ) {
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
            price: flight.price + remainingFlights.price,
          };
        }
      }
    }

    visited.delete(currentStation);
    return null;
  }
}
