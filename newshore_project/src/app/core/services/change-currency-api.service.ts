import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiKey = 'TU_API_KEY'; // Reemplaza con tu propia API Key de exchangerates-api.io
  private apiUrl = 'https://open.er-api.com/v6/latest/';

  constructor(private http: HttpClient) { }

  getExchangeRates(baseCurrency: string): Observable<any> {
    const url = `${this.apiUrl}${baseCurrency}?apikey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  convertCurrency(amount: number, fromCurrency: string, toCurrency: string, rates: any): number {
    if (fromCurrency === toCurrency) {
      return amount;
    }

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (fromRate && toRate) {
      return (amount / fromRate) * toRate;
    }

    return amount;
  }
}
