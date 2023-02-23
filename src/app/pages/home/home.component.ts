import { Component, OnDestroy, OnInit } from '@angular/core';
import { Stay } from 'src/app/models/stay';
import { StayService } from 'src/app/services/stay.service';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private stayService: StayService) {}
  listViewMode: boolean = true;
  stays$!: Observable<Stay[]>;

  ngOnInit(): void {
    this.stayService.loadStays();
    this.stays$ = this.stayService.stays$;
  }
}
