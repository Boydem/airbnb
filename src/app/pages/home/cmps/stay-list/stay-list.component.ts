import { Component, Input, OnInit } from '@angular/core';
import { StayPreview } from 'src/app/models/stay';
import { Observable, Subscription } from 'rxjs';
import { StayService } from 'src/app/services/stay.service';

@Component({
  selector: 'stay-list',
  templateUrl: './stay-list.component.html',
  styleUrls: ['./stay-list.component.scss'],
})
export class StayListComponent implements OnInit {
  @Input() stays$!: Observable<StayPreview[]> | undefined;
  @Input() numSkeletons: number = 0;
  pageIdx = 0;
  isLoading = true;
  stays: StayPreview[] = [];
  hasMoreData = true;

  subscription!: Subscription | undefined;

  constructor(private stayService: StayService) {}

  ngOnInit(): void {
    this.subscription = this.stays$?.subscribe((stays) => {
      if (stays.length) {
        this.isLoading = false;
        this.stays = stays;
      }
    });
  }

  loadMoreStays() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.pageIdx++;

      this.stayService.getStayPreviews(this.pageIdx).subscribe((newStays) => {
        if (newStays.length === 0) {
          this.hasMoreData = false;
        }
        this.stays = [...this.stays, ...newStays];
        this.isLoading = false;
      });
    }
  }

  handleIntersection() {
    if (this.hasMoreStaysToLoad() && !this.isLoading) {
      this.loadMoreStays();
    }
  }

  hasMoreStaysToLoad() {
    return this.hasMoreData;
  }

  getSkeletonArray() {
    return new Array(this.numSkeletons);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
