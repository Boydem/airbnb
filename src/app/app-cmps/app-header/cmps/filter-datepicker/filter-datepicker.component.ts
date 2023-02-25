import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'filter-datepicker',
  templateUrl: './filter-datepicker.component.html',
  styleUrls: ['./filter-datepicker.component.scss'],
})
export class FilterDatepickerComponent {
  faX = faX;
  @Input() activeModule!: string | null;
  @Output() changeModule = new EventEmitter<string>();

  onChangeModule(module: string) {
    this.changeModule.emit(module);
  }
}
