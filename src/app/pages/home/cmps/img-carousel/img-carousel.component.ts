import { Component, Input } from '@angular/core';

@Component({
  selector: 'img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.scss'],
})
export class ImgCarouselComponent {
  @Input() imgUrls!: string[];
}
