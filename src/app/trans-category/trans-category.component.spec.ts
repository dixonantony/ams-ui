import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransCategoryComponent } from './trans-category.component';

describe('TransCategoryComponent', () => {
  let component: TransCategoryComponent;
  let fixture: ComponentFixture<TransCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
