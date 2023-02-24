import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTeaserComponent } from './search-teaser.component';

describe('SearchTeaserComponent', () => {
  let component: SearchTeaserComponent;
  let fixture: ComponentFixture<SearchTeaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTeaserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
