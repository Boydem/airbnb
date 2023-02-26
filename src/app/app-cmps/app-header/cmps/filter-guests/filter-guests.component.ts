import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const counters = [
  {
    subject: 'Adults',
    description: 'Ages 13 or above',
    count: 0,
    id: 'adults',
  },
  {
    subject: 'Children',
    description: 'Ages 2-12',
    count: 0,
    id: 'children',
  },
  {
    subject: 'Infants',
    description: 'Under 2',
    count: 0,
    id: 'infants',
  },
  {
    subject: 'Pets',
    description: 'Bringing a service animal',
    count: 0,
    id: 'pets',
  },
];
@Component({
  selector: 'filter-guests',
  templateUrl: './filter-guests.component.html',
  styleUrls: ['./filter-guests.component.scss'],
})
export class FilterGuestsComponent {
  faX = faX;
  faMinus = faMinus;
  faPlus = faPlus;
  counters = counters;
  totalGuests: number = 0;

  @Input() activeModule!: string | null;
  @Output() changeModule = new EventEmitter<string>();
  onChangeModule(module: string) {
    this.changeModule.emit(module);
  }

  selectedGuests: { [key: string]: number } | null = null;

  onCounterChange(isIncreasing: boolean, counterIdx: number) {
    const currentCounter = this.counters[counterIdx];
    currentCounter.count += isIncreasing ? 1 : -1;
  }
}
