import { Component, Input } from '@angular/core';
import { Stay } from 'src/app/models/stay';
@Component({
  selector: 'stay-list',
  templateUrl: './stay-list.component.html',
  styleUrls: ['./stay-list.component.scss'],
})
export class StayListComponent {
  @Input() stays!: Stay[] | null;
}
