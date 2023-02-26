import { Component, Input } from '@angular/core';
import { StayPreview } from 'src/app/models/stay';
import { Observable } from 'rxjs';
@Component({
  selector: 'stay-list',
  templateUrl: './stay-list.component.html',
  styleUrls: ['./stay-list.component.scss'],
})
export class StayListComponent {
  @Input() stays$!: Observable<StayPreview[]> | undefined;
  @Input() numSkeletons: number = 0;

  getSkeletonArray() {
    return new Array(this.numSkeletons);
  }
}
