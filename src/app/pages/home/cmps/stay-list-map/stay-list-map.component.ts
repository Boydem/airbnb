import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StayPreview } from 'src/app/models/stay';
import { MapMarkerComponent } from 'src/app/app-cmps/map-marker/map-marker.component';

@Component({
  selector: 'stay-list-map',
  templateUrl: './stay-list-map.component.html',
  styleUrls: ['./stay-list-map.component.scss'],
})
export class StayListMapComponent implements OnInit, OnDestroy {
  @Input() stays$!: Observable<StayPreview[]>;
  zoom = 2;
  center = {
    lat: 37.7749,
    lng: -122.4194,
  };
  stays!: StayPreview[];

  @ViewChild('myMap', { static: false }) mapElement!: ElementRef;
  map!: google.maps.Map;

  subscription!: Subscription;

  onMarkerClick(stay: StayPreview) {
    // show the custom modal for the clicked stay
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: this.center,
        zoom: this.zoom,
      });
      this.subscription = this.stays$.subscribe((stays) => {
        console.log('stays:', stays);
        this.stays = stays;
        this.addMarkers();
      });
    }, 100); // Wait for 100ms before creating the map
  }

  addMarkers(): void {
    console.log('this.map:', this.map);
    if (this.map) {
      console.log('this.map:', this.map);
      this.stays.forEach((stay) => {
        const markerDiv = document.createElement('div');
        markerDiv.classList.add('custom-marker');
        const latLng = new google.maps.LatLng(stay.loc.lat, stay.loc.lng);
        const marker = new MapMarkerComponent(
          new ElementRef(markerDiv),
          latLng,
          this.map
        );
        marker.stay = stay;
        marker.setMap(this.map); // Add the marker to the map
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
