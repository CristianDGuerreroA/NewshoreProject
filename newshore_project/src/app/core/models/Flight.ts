// flight.model.ts
import { Transport } from './Transport';

export class Flight {
  transport: Transport;
  origin: string;
  destination: string;
  price: number;

  constructor(transport: Transport, origin: string, destination: string, price: number) {
    this.transport = transport;
    this.origin = origin;
    this.destination = destination;
    this.price = price;
  }

  toJson(): any {
    return {
      Origin: this.origin,
      Destination: this.destination,
      Price: this.price,
      Transport: {
        FlightCarrier: this.transport.flightCarrier,
        FlightNumber: this.transport.flightNumber
      }
    };
  }
}
