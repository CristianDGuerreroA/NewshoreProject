/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenerateRoutesService } from './generate-routes.service';

describe('Service: GenerateRoutes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateRoutesService]
    });
  });

  it('should ...', inject([GenerateRoutesService], (service: GenerateRoutesService) => {
    expect(service).toBeTruthy();
  }));
});
