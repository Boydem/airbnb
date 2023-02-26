import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { StayPreview } from 'src/app/models/stay';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'stay-preview',
  templateUrl: './stay-preview.component.html',
  styleUrls: ['./stay-preview.component.scss'],
})
export class StayPreviewComponent implements OnChanges {
  faStar = faStar;
  constructor() {}

  @Input() stay!: StayPreview | undefined;
  isLoaded = false;

  ngOnChanges(changes: SimpleChanges): void {
    if ('stay' in changes && this.stay) {
      setTimeout(() => {
        this.isLoaded = true;
      }, 300);
    }
  }
}
