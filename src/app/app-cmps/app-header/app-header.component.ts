import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterBy } from 'src/app/models/filter';
import { StayService } from 'src/app/services/stay.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  constructor(private stayService: StayService) {}
  isExpanded: boolean = false;
  filterBy!: FilterBy;
  activeModule: string | null = null;

  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.stayService.filterBy$.subscribe((filterBy) => {
      console.log('filterBy:', filterBy);
      this.filterBy = filterBy;
    });
  }

  changeModule(module: string) {
    if (this.activeModule === module) return;
    this.activeModule = module;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
