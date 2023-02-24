import { Component, OnDestroy, OnInit } from '@angular/core';
import { Stay } from 'src/app/models/stay';
import { StayService } from 'src/app/services/stay.service';
import { Observable } from 'rxjs';

import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private stayService: StayService) {}
  listViewMode: boolean = true;
  stays$!: Observable<Stay[]>;

  faMap = faMap;
  faList = faList;

  ngOnInit(): void {
    this.stayService.loadStays();
    this.stays$ = this.stayService.stays$;
  }
}
