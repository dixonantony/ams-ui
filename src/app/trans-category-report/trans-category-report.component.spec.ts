import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransCategoryReportComponent } from './trans-category-report.component';

describe('TransCategoryReportComponent', () => {
  let component: TransCategoryReportComponent;
  let fixture: ComponentFixture<TransCategoryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransCategoryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransCategoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
