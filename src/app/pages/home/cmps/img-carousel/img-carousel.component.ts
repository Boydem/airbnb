import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.scss'],
})
export class ImgCarouselComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  @Input() imgUrls!: string[];
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  currentIndex: number = 0;
  isTransitioning = false;

  ngOnInit(): void {}

  goToNextOrPrev(isNext: boolean) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    const carouselContainer = this.carouselContainer.nativeElement;
    const itemWidth = carouselContainer.offsetWidth;
    const itemCount = carouselContainer.children.length;
    this.currentIndex =
      (this.currentIndex + (isNext ? 1 : -1) + itemCount) % itemCount;
    carouselContainer.scroll({
      left: itemWidth * this.currentIndex,
      behavior: 'smooth',
    });
    setTimeout(() => {
      this.isTransitioning = false;
    }, 250);
  }

  goToIndex(index: number) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    const carouselContainer = this.carouselContainer.nativeElement;
    const itemWidth = carouselContainer.offsetWidth;
    const itemCount = carouselContainer.children.length;
    this.currentIndex = (index + itemCount) % itemCount;
    carouselContainer.scroll({
      left: itemWidth * this.currentIndex,
      behavior: 'smooth',
    });
    setTimeout(() => {
      this.isTransitioning = false;
    }, 250);
  }
}
