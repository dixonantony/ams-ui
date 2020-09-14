import { TestBed } from '@angular/core/testing';

import { AppartmentDataService } from './appartment-data.service';

describe('AppartmentDataService', () => {
  let service: AppartmentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppartmentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
