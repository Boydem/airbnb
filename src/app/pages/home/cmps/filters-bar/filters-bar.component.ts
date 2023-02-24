import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { StayService } from 'src/app/services/stay.service';
import { Filter } from 'src/app/models/filter';
// import {filters} from '../../../../data/filters.json'

@Component({
  selector: 'filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss'],
})
export class FiltersBarComponent implements OnInit {
  constructor(private stayService: StayService) {}
  // @Input() filters!
  isModalOpen = false;
  filters$!: Observable<Filter[]>;

  ngOnInit(): void {
    this.stayService.loadFilters();
    this.filters$ = this.stayService.filters$;
  }
}
