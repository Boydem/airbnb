import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { StayPreview } from 'src/app/models/stay';

@Component({
  selector: 'map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.scss'],
})
export class MapMarkerComponent
  extends google.maps.OverlayView
  implements OnInit
{
  private div!: HTMLDivElement;
  @Input() stay!: StayPreview;

  constructor(
    private el: ElementRef,
    private latLng: google.maps.LatLng,
    private map: google.maps.Map
  ) {
    super();
  }

  ngOnInit(): void {
    this.div = this.el.nativeElement as HTMLDivElement;
    this.setMap(this.map);
  }

  override onAdd(): void {
    const panes = this.getPanes();
    if (panes) {
      panes.overlayMouseTarget.appendChild(this.div);
    }
  }

  override onRemove(): void {
    if (this.div.parentNode) {
      this.div.parentNode.removeChild(this.div);
    }
  }

  override draw(): void {
    const point = this.getProjection().fromLatLngToDivPixel(this.latLng);
    if (point) {
      this.div.style.left = point.x + 'px';
      this.div.style.top = point.y + 'px';
    }
  }
}
