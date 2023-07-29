import { TestBed } from '@angular/core/testing';
import { GenerateRoutesService } from './generate-routes.service';
import { Flight } from '../../models/Flight';
import { ShowToastAlertsService } from '../alerts/show-toast-alerts.service';
import { Transport } from '../../models/Transport'; // Importa la clase Transport

describe('GenerateRoutesService', () => {
  let service: GenerateRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateRoutesService, ShowToastAlertsService],
    });
    service = TestBed.inject(GenerateRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate route correctly when destination is reached', () => {
    const transport: Transport = new Transport('Carrier1', '123');
    const flights: Flight[] = [
      new Flight(transport, 'A', 'B', 100),
      new Flight(transport, 'B', 'C', 200),
    ];

    const visited = new Set<string>();
    visited.add('A');

    const result = service.dfsSearch('A', 'A', 10, visited, flights);

    expect(result).toEqual({ flights: [], price: 0 });
  });

  it('should return null when maxFlights is 0', () => {
    const transport: Transport = new Transport('Carrier1', '123');
    const flights: Flight[] = [
      new Flight(transport, 'A', 'B', 100),
      new Flight(transport, 'B', 'C', 200),
    ];

    const visited = new Set<string>();
    visited.add('A');

    const result = service.dfsSearch('A', 'C', 0, visited, flights);

    expect(result).toBeNull();
  });

  it('should calculate route correctly', () => {
    const transport: Transport = new Transport('Carrier1', '123');
    const flights: Flight[] = [
      new Flight(transport, 'A', 'B', 100),
      new Flight(transport, 'B', 'C', 200),
    ];

    const visited = new Set<string>();
    visited.add('A');

    const result = service.dfsSearch('A', 'C', 10, visited, flights);

    expect(result).toEqual({
      flights: [
        new Flight(transport, 'A', 'B', 100),
        new Flight(transport, 'B', 'C', 200),
      ],
      price: 300
    });
  });
});
