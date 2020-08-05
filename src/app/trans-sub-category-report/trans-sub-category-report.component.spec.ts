import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransSubCategoryReportComponent } from './trans-sub-category-report.component';

describe('TransSubCategoryReportComponent', () => {
  let component: TransSubCategoryReportComponent;
  let fixture: ComponentFixture<TransSubCategoryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransSubCategoryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransSubCategoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
