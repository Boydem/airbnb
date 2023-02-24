import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.scss'],
})
export class ImgCarouselComponent implements AfterViewInit, OnDestroy {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  @Input() imgUrls!: string[];
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  currentIndex: number = 0;
  isScrolling = false;
  elCarouselContainer!: HTMLElement;

  ngAfterViewInit(): void {
    this.elCarouselContainer = this.carouselContainer.nativeElement;
    this.addScrollEventListener();
  }

  addScrollEventListener() {
    this.elCarouselContainer.addEventListener('scroll', this.handleScroll);
  }

  removeScrollEventListener() {
    this.elCarouselContainer.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const itemWidth = this.elCarouselContainer.offsetWidth;
    const itemCount = this.elCarouselContainer.children.length;
    const currentIndex = Math.round(
      this.elCarouselContainer.scrollLeft / itemWidth
    );
    this.currentIndex = (currentIndex + itemCount) % itemCount;
  };

  goToNextOrPrev(isNext: boolean) {
    if (this.isScrolling) return;
    this.isScrolling = true;

    this.removeScrollEventListener(); // remove scroll event listener before scrolling
    const itemWidth = this.elCarouselContainer.offsetWidth;
    const itemCount = this.elCarouselContainer.children.length;
    this.currentIndex =
      (this.currentIndex + (isNext ? 1 : -1) + itemCount) % itemCount;

    this.elCarouselContainer.scroll({
      left: itemWidth * this.currentIndex,
    });

    setTimeout(() => {
      this.isScrolling = false;
      this.addScrollEventListener(); // re-attach scroll event listener after scrolling
    }, 250);
  }

  goToIndex(index: number) {
    if (this.isScrolling) return;
    this.isScrolling = true;

    this.removeScrollEventListener(); // remove scroll event listener before scrolling
    const itemWidth = this.elCarouselContainer.offsetWidth;
    const itemCount = this.elCarouselContainer.children.length;
    this.currentIndex = (index + itemCount) % itemCount;

    this.elCarouselContainer.scroll({
      left: itemWidth * this.currentIndex,
    });

    setTimeout(() => {
      this.isScrolling = false;
      this.addScrollEventListener(); // re-attach scroll event listener after scrolling
    }, 250);
  }
  ngOnDestroy(): void {
    this.removeScrollEventListener();
  }
}
