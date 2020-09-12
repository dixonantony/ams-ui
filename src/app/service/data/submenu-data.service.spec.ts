import { TestBed } from '@angular/core/testing';

import { SubmenuDataService } from './submenu-data.service';

describe('SubmenuDataService', () => {
  let service: SubmenuDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmenuDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
