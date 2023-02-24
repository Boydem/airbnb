import { Component, Input } from '@angular/core';

@Component({
  selector: 'overlay-screen',
  templateUrl: './overlay-screen.component.html',
  styleUrls: ['./overlay-screen.component.scss'],
})
export class OverlayScreenComponent {
  @Input() isOpen!: boolean;
}
