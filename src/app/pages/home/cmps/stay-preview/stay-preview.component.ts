import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
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
export class StayPreviewComponent implements OnChanges, OnInit {
  faStar = faStar;
  @Input() isLast!: boolean;
  @Input() stay!: StayPreview | undefined;
  @Output() public onIntersection = new EventEmitter();
  isLoaded = false;

  private observer: IntersectionObserver;

  constructor(private elementRef: ElementRef) {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && this.isLast) {
          this.onIntersection.emit();
        }
      },
      { threshold: 0.0 }
    );
  }

  ngOnInit() {
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('stay' in changes && this.stay) {
      setTimeout(() => {
        this.isLoaded = true;
      }, 300);
    }
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
