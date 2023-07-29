import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlightService } from './get-flights-api.service';
import { Flight } from '../../models/Flight';
import { Transport } from '../../models/Transport';

describe('FlightService', () => {
  let service: FlightService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlightService]
    });

    service = TestBed.inject(FlightService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verificar que no haya solicitudes pendientes después de cada prueba
    httpMock.verify();
  });

  it('debe ser creado el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener los vuelos de manera correcta', () => {
    const dummyResponse = [
      {
        flightCarrier: 'CO',
        flightNumber: '8001',
        departureStation: 'MZL',
        arrivalStation: 'MDE',
        price: 200
      },
      {
        flightCarrier: 'CO',
        flightNumber: '8002',
        departureStation: 'MZL',
        arrivalStation: 'CGT',
        price: 200
      }
    ];

    service.getFlights().subscribe(response => {
      expect(response.length).toBe(2);
      expect(response[0]).toEqual(new Flight(new Transport('CO', '8001'), 'MZL', 'MDE', 200));
      expect(response[1]).toEqual(new Flight(new Transport('CO', '8002'), 'MZL', 'CGT', 200));
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('debe retornar los datos de los vuelos correctamente', () => {
    const dummyData = [
      {
        flightCarrier: 'CO',
        flightNumber: '8003',
        departureStation: 'PEI',
        arrivalStation: 'BOG',
        price: 200
      },
      {
        flightCarrier: 'CO',
        flightNumber: '8004',
        departureStation: 'MDE',
        arrivalStation: 'BCN',
        price: 500
      }
    ];

    const result = service['mapToFlights'](dummyData);
    expect(result.length).toBe(2);
    expect(result[0]).toEqual(new Flight(new Transport('CO', '8003'), 'PEI', 'BOG', 200));
    expect(result[1]).toEqual(new Flight(new Transport('CO', '8004'), 'MDE', 'BCN', 500));
  });

  it('debe retornar el mensaje de error correcto', () => {
    const errorResponse: any = {
      status: 404,
      message: 'Not Found'
    };

    const result = service['getServerErrorMessage'](errorResponse);
    expect(result).toBe('Not Found: Not Found');

    errorResponse.status = 403;
    errorResponse.message = 'Access Denied';
    expect(service['getServerErrorMessage'](errorResponse)).toBe('Access Denied: Access Denied');

    errorResponse.status = 400;
    errorResponse.message = 'Bad Request';
    expect(service['getServerErrorMessage'](errorResponse)).toBe('Bad Request: Bad Request');

    errorResponse.status = 500;
    errorResponse.message = 'Internal Server Error';
    expect(service['getServerErrorMessage'](errorResponse)).toBe('Internal Server Error: Internal Server Error');

    errorResponse.status = 999; // Unknown status
    errorResponse.message = 'Unknown Error';
    expect(service['getServerErrorMessage'](errorResponse)).toBe('Unknown Server Error: Unknown Error');
  });
});
