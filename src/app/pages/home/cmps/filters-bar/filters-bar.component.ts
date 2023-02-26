import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StayService } from 'src/app/services/stay.service';
import { Filter, FilterBy } from 'src/app/models/filter';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss'],
})
export class FiltersBarComponent implements OnInit, OnDestroy {
  constructor(private stayService: StayService) {}
  // @Input() filters!
  faChevronRight = faChevronRight;
  faFilter = faSliders;
  isModalOpen = false;
  filters$!: Observable<Filter[]>;
  filterBy!: FilterBy;

  subscription!: Subscription;

  ngOnInit(): void {
    this.stayService.loadFilters();
    this.subscription = this.stayService.filterBy$.subscribe((filterBy) => {
      this.filterBy = filterBy;
    });
    this.filters$ = this.stayService.filters$;
  }

  onFilterChange() {
    this.stayService.setFilter(this.filterBy);
  }

  onNextFilters() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
