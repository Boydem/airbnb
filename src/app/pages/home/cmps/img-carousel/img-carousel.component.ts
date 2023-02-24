import { Component, Input } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.scss'],
})
export class ImgCarouselComponent {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  @Input() imgUrls!: string[];
  currentIndex: number = 0;

  goToPrev() {}
  goToNext() {}
  goToIndex(index: number) {}
}
