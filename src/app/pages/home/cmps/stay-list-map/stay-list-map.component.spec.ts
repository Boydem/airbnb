import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayListMapComponent } from './stay-list-map.component';

describe('StayListMapComponent', () => {
  let component: StayListMapComponent;
  let fixture: ComponentFixture<StayListMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StayListMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StayListMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
