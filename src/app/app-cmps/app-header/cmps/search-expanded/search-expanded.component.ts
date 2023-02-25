import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FilterBy } from 'src/app/models/filter';

@Component({
  selector: 'search-expanded',
  templateUrl: './search-expanded.component.html',
  styleUrls: ['./search-expanded.component.scss'],
})
export class SearchExpandedComponent implements OnInit {
  faSearch = faSearch;
  @Input() filterBy!: FilterBy;
  @Input() activeModule!: string | null;
  @Output() changeModule = new EventEmitter<string>();

  onChangeModule(module: string) {
    this.changeModule.emit(module);
  }
  ngOnInit(): void {
    console.log('this.filterBy:', this.filterBy);
  }
}
