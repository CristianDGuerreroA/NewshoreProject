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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get exchange rates correctly', () => {
    const baseCurrency = 'USD';
    const dummyResponse = { base: 'USD', rates: { EUR: 0.85, GBP: 0.75 } };

    service.getExchangeRates(baseCurrency).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}${baseCurrency}?apikey=${service['apiKey']}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should convert currency correctly', () => {
    const amount = 100;
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    const rates = { USD: 1, EUR: 0.85, GBP: 0.75 };

    const result = service.convertCurrency(amount, fromCurrency, toCurrency, rates);
    expect(result).toBe(85); // 100 USD should be converted to 85 EUR based on the rates provided
  });

  it('should return same amount when converting to the same currency', () => {
    const amount = 100;
    const fromCurrency = 'USD';
    const toCurrency = 'USD';
    const rates = { USD: 1, EUR: 0.85, GBP: 0.75 };

    const result = service.convertCurrency(amount, fromCurrency, toCurrency, rates);
    expect(result).toBe(amount); // Converting to the same currency should return the same amount
  });

  it('should return the original amount when rates are not available', () => {
    const amount = 100;
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    const rates = { GBP: 0.75 }; // EUR rate is missing

    const result = service.convertCurrency(amount, fromCurrency, toCurrency, rates);
    expect(result).toBe(amount); // If rates are not available, the original amount should be returned
  });
});
