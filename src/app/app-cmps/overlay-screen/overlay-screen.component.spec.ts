import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayScreenComponent } from './overlay-screen.component';

describe('OverlayScreenComponent', () => {
  let component: OverlayScreenComponent;
  let fixture: ComponentFixture<OverlayScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
