/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChangeCurrencyApiService } from './change-currency-api.service';

describe('Service: ChangeCurrencyApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeCurrencyApiService]
    });
  });

  it('should ...', inject([ChangeCurrencyApiService], (service: ChangeCurrencyApiService) => {
    expect(service).toBeTruthy();
  }));
});
