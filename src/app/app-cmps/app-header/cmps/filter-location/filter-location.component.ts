import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'filter-location',
  templateUrl: './filter-location.component.html',
  styleUrls: ['./filter-location.component.scss'],
})
export class FilterLocationComponent {
  @Input() activeModule!: string | null;
  @Output() changeModule = new EventEmitter<string>();
  selectedDestination: string | null = null;
  faX = faX;

  onChangeModule(module: string) {
    this.changeModule.emit(module);
  }
}
