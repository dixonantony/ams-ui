import { TestBed } from '@angular/core/testing';

import { TransCategoryDataService } from './trans-category-data.service';

describe('TransCategoryDataService', () => {
  let service: TransCategoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransCategoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
