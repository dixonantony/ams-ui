import { TestBed } from '@angular/core/testing';

import { OccupantDataService } from './occupant-data.service';

describe('OccupantDataService', () => {
  let service: OccupantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccupantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
