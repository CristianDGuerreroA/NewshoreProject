// transport.model.ts
export class Transport {
  flightCarrier: string;
  flightNumber: string;

  constructor(flightCarrier: string, flightNumber: string) {
    this.flightCarrier = flightCarrier;
    this.flightNumber = flightNumber;
  }
}
