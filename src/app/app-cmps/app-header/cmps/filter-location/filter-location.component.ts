import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

const regions = [
  {
    id: 'all',
    label: "I'm Flexible",
    img: '../../../../../assets/images/regions/all.webp',
  },
  {
    id: 'middle-east',
    label: 'Middle East',
    img: '../../../../../assets/images/regions/middle-east.webp',
  },
  {
    id: 'italy',
    label: 'Italy',
    img: '../../../../../assets/images/regions/italy.webp',
  },
  {
    id: 'south-america',
    label: 'South America',
    img: '../../../../../assets/images/regions/south-america.webp',
  },
  {
    id: 'france',
    label: 'France',
    img: '../../../../../assets/images/regions/france.webp',
  },
  {
    id: 'usa',
    label: 'United States',
    img: '../../../../../assets/images/regions/usa.webp',
  },
];

@Component({
  selector: 'filter-location',
  templateUrl: './filter-location.component.html',
  styleUrls: ['./filter-location.component.scss'],
})
export class FilterLocationComponent {
  @Input() activeModule!: string | null;
  @Output() changeModule = new EventEmitter<string>();
  selectedDestination: string | null = null;
  typedDestination: string | null = null;
  faX = faX;
  regions = regions;
  isInputDirty = false;

  onChangeModule(module: string) {
    this.changeModule.emit(module);
  }

  onRegionClick(ev: MouseEvent, regionLabel: string) {
    ev.stopPropagation();
    this.selectedDestination = regionLabel;
    this.onChangeModule('start-date');
  }
}
