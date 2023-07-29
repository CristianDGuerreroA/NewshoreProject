import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Flight } from '../../models/Flight'; // Asegúrate de importar la clase Flight desde la ubicación correcta
import { Transport } from '../../models/Transport';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = 'https://recruiting-api.newshore.es/api/flights/2';

  constructor(private http: HttpClient) { }

  getFlights(): Observable<Flight[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(response => this.mapToFlights(response))
    );
  }

  private mapToFlights(data: any[]): Flight[] {
    return data.map(item => new Flight(
      new Transport(item.flightCarrier, item.flightNumber),
      item.departureStation,
      item.arrivalStation,
      item.price
    ));
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 400: {
        return `Bad Request: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
