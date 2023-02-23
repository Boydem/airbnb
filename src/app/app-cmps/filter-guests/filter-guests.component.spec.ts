import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGuestsComponent } from './filter-guests.component';

describe('FilterGuestsComponent', () => {
  let component: FilterGuestsComponent;
  let fixture: ComponentFixture<FilterGuestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterGuestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
