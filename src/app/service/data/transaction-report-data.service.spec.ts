import { TestBed } from '@angular/core/testing';

import { TransactionReportDataService } from './transaction-report-data.service';

describe('TransactionReportDataService', () => {
  let service: TransactionReportDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionReportDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
