import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-currency-selector',
  templateUrl: 'templates/currency-selector.component.html',
  styleUrls: ['styles/currency-selector.component.css']
})

export class CurrencySelectorComponent  {
  @Input() selectedCurrency: string = 'USD';
  @Output() currencyChange = new EventEmitter<any>();

  currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY'];

  constructor() { }

  onCurrencyChange(event: any): void {
    this.currencyChange.emit(event);
  }

}
