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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get flights correctly', () => {
    const dummyResponse = [
      {
        flightCarrier: 'Carrier1',
        flightNumber: '123',
        departureStation: 'A',
        arrivalStation: 'B',
        price: 100
      },
      {
        flightCarrier: 'Carrier2',
        flightNumber: '456',
        departureStation: 'B',
        arrivalStation: 'C',
        price: 200
      }
    ];

    service.getFlights().subscribe(response => {
      expect(response.length).toBe(2);
      expect(response[0]).toEqual(new Flight(new Transport('Carrier1', '123'), 'A', 'B', 100));
      expect(response[1]).toEqual(new Flight(new Transport('Carrier2', '456'), 'B', 'C', 200));
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should map data to flights correctly', () => {
    const dummyData = [
      {
        flightCarrier: 'Carrier1',
        flightNumber: '123',
        departureStation: 'A',
        arrivalStation: 'B',
        price: 100
      },
      {
        flightCarrier: 'Carrier2',
        flightNumber: '456',
        departureStation: 'B',
        arrivalStation: 'C',
        price: 200
      }
    ];

    const result = service['mapToFlights'](dummyData);
    expect(result.length).toBe(2);
    expect(result[0]).toEqual(new Flight(new Transport('Carrier1', '123'), 'A', 'B', 100));
    expect(result[1]).toEqual(new Flight(new Transport('Carrier2', '456'), 'B', 'C', 200));
  });

  it('should return server error message correctly', () => {
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
