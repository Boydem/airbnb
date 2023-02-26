import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'filter-guests',
  templateUrl: './filter-guests.component.html',
  styleUrls: ['./filter-guests.component.scss'],
})
export class FilterGuestsComponent {
  faX = faX;

  @Input() activeModule!: string | null;
  @Output() changeModule = new EventEmitter<string>();
  onChangeModule(module: string) {
    this.changeModule.emit(module);
  }

  selectedGuests: { [key: string]: number } | null = null;
}
