import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOccupantsComponent } from './list-occupants.component';

describe('ListOccupantsComponent', () => {
  let component: ListOccupantsComponent;
  let fixture: ComponentFixture<ListOccupantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOccupantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOccupantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
