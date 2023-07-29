import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService } from './change-currency-api.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService]
    });

    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verificar que no haya solicitudes pendientes después de cada prueba
    httpMock.verify();
  });

  it('debe ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener las tasas correctamente', () => {
    const baseCurrency = 'USD';
    const dummyResponse = { base: 'USD', rates: { EUR: 0.85, GBP: 0.75 } };

    service.getExchangeRates(baseCurrency).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}${baseCurrency}?apikey=${service['apiKey']}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('debe hacer la conversion de base de manera correcta', () => {
    const amount = 100;
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    const rates = { USD: 1, EUR: 0.85, GBP: 0.75 };

    const result = service.convertCurrency(amount, fromCurrency, toCurrency, rates);
    expect(result).toBe(85); 
  });

  it('debe retornar el mismo valor cuando se convierte a la misma base', () => {
    const amount = 100;
    const fromCurrency = 'USD';
    const toCurrency = 'USD';
    const rates = { USD: 1, EUR: 0.85, GBP: 0.75 };

    const result = service.convertCurrency(amount, fromCurrency, toCurrency, rates);
    expect(result).toBe(amount);
  });

  it('debe retornar el valor original cuando las tasas no están disponibles', () => {
    const amount = 100;
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    const rates = { GBP: 0.75 };

    const result = service.convertCurrency(amount, fromCurrency, toCurrency, rates);
    expect(result).toBe(amount);
  });
});
