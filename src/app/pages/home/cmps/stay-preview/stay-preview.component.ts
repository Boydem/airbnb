import { Component, Input } from '@angular/core';
import { Stay } from 'src/app/models/stay';
import { faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'stay-preview',
  templateUrl: './stay-preview.component.html',
  styleUrls: ['./stay-preview.component.scss'],
})
export class StayPreviewComponent {
  faStar = faStar;
  @Input() stay!: Stay;
}
