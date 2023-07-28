/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetDataRoutesApiService } from './get-data-routes-api.service';

describe('Service: GetDataRoutesApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDataRoutesApiService]
    });
  });

  it('should ...', inject([GetDataRoutesApiService], (service: GetDataRoutesApiService) => {
    expect(service).toBeTruthy();
  }));
});
