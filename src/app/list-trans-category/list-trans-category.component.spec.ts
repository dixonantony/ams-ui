import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTransCategoryComponent } from './list-trans-category.component';

describe('ListTransCategoryComponent', () => {
  let component: ListTransCategoryComponent;
  let fixture: ComponentFixture<ListTransCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTransCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTransCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
