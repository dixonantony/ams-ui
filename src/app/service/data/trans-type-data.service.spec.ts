import { TestBed } from '@angular/core/testing';

import { TransTypeDataService } from './trans-type-data.service';

describe('TransTypeDataService', () => {
  let service: TransTypeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransTypeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
