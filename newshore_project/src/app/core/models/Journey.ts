// journey.model.ts
import { Flight } from './Flight';

export class Journey {
  flights: Flight[];
  origin: string;
  destination: string;
  price: number;

  constructor(flights: Flight[], origin: string, destination: string, price: number) {
    this.flights = flights;
    this.origin = origin;
    this.destination = destination;
    this.price = price;
  }
}
