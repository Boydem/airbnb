import { Component, Input } from '@angular/core';
import { StayPreview } from 'src/app/models/stay';

@Component({
  selector: 'stay-list-map',
  templateUrl: './stay-list-map.component.html',
  styleUrls: ['./stay-list-map.component.scss'],
})
export class StayListMapComponent {
  @Input() stays!: StayPreview[] | null;
}
