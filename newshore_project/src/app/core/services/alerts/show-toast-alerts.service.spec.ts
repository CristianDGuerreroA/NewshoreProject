/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShowToastAlertsService } from './show-toast-alerts.service';

describe('Service: ShowToastAlerts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowToastAlertsService]
    });
  });

  it('should ...', inject([ShowToastAlertsService], (service: ShowToastAlertsService) => {
    expect(service).toBeTruthy();
  }));
});
