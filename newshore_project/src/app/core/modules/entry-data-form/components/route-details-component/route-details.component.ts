import { Component, Input } from '@angular/core';
import { Journey } from 'src/app/core/models/Journey';
import { CurrencyService } from 'src/app/core/services/consume-api/change-currency-api.service';

@Component({
  selector: 'app-route-details',
  templateUrl: 'templates/route-details.component.html',
  styleUrls: ['styles/route-details.component.css']
})
export class RouteDetailsComponent {
  @Input() journey: Journey | null = null;
  @Input() selectedCurrency: string = 'USD';

  constructor(private currencyService: CurrencyService) { }


  onCurrencyChange(event: any): void {
    this.selectedCurrency = event.target.value;
    this.convertRouteToSelectedCurrency();
  }

  convertRouteToSelectedCurrency(): void {
    if (this.journey) {
      this.currencyService.getExchangeRates(this.selectedCurrency).subscribe(
        rates => {
          if(this.journey !== null){
            this.journey.price = this.currencyService.convertCurrency(this.journey.price, 'USD', this.selectedCurrency, rates.rates);
            this.journey.flights.forEach(flight => {
              flight.price = this.currencyService.convertCurrency(flight.price, 'USD', this.selectedCurrency, rates.rates);
            });
          }
        },
        error => {
          console.error('Error al obtener las tasas de cambio:', error);
        }
      );
    }
  }
}
