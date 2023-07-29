import { TestBed } from '@angular/core/testing';
import { GenerateRoutesService } from './generate-routes.service';
import { Flight } from '../../models/Flight';
import { ShowToastAlertsService } from '../alerts/show-toast-alerts.service';
import { Transport } from '../../models/Transport'; 

describe('GenerateRoutesService', () => {
  let service: GenerateRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateRoutesService, ShowToastAlertsService],
    });
    service = TestBed.inject(GenerateRoutesService);
  });

  it('debe ser creado el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe calcular la ruta correctamente cuando se llega a destino', () => {
    const transport: Transport = new Transport('CO', '8001');
    const flights: Flight[] = [
      new Flight(transport, 'MZL', 'MDE', 200),
      new Flight(transport, 'MZL', 'CTG', 200),
    ];

    const visited = new Set<string>();
    visited.add('MZL');

    const result = service.dfsSearch('MZL', 'MZL', 10, visited, flights);

    expect(result).toEqual({ flights: [], price: 0 });
  });

  it('debe devolver null cuando maxFlights es 0', () => {
    const transport: Transport = new Transport('CO', '8001');
    const flights: Flight[] = [
      new Flight(transport, 'MZL', 'MDE', 200),
      new Flight(transport, 'MDE', 'BCN', 500),
    ];

    const visited = new Set<string>();
    visited.add('MZL');

    const result = service.dfsSearch('MZL', 'BCN', 0, visited, flights);

    expect(result).toBeNull();
  });

  it('debe calcular la ruta correctamente', () => {
    const transport: Transport = new Transport('CO', '8003');
    const flights: Flight[] = [
      new Flight(transport, 'PEI', 'BOG', 200),
      new Flight(transport, 'BOG', 'MAD', 500),
    ];

    const visited = new Set<string>();
    visited.add('PEI');

    const result = service.dfsSearch('PEI', 'MAD', 10, visited, flights);

    expect(result).toEqual({
      flights: [
        new Flight(transport, 'PEI', 'BOG', 200),
      new Flight(transport, 'BOG', 'MAD', 500),
      ],
      price: 700
    });
  });
});
