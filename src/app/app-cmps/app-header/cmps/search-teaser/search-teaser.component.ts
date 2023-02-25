import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FilterBy } from 'src/app/models/filter';

@Component({
  selector: 'search-teaser',
  templateUrl: './search-teaser.component.html',
  styleUrls: ['./search-teaser.component.scss'],
})
export class SearchTeaserComponent {
  faSearch = faSearch;
  @Input() filterBy!: FilterBy;
  @Input() activeModule!: string | null;
  @Output() changeModule = new EventEmitter<string>();

  onChangeModule(module: string) {
    this.changeModule.emit(module);
  }
}
