import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchExpandedComponent } from './search-expanded.component';

describe('SearchExpandedComponent', () => {
  let component: SearchExpandedComponent;
  let fixture: ComponentFixture<SearchExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchExpandedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
