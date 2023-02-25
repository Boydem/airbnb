import { Component } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'filter-guests',
  templateUrl: './filter-guests.component.html',
  styleUrls: ['./filter-guests.component.scss'],
})
export class FilterGuestsComponent {
  faX = faX;
}
