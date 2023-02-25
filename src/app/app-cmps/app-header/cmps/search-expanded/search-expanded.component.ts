import { Component, Input, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FilterBy } from 'src/app/models/filter';

@Component({
  selector: 'search-expanded',
  templateUrl: './search-expanded.component.html',
  styleUrls: ['./search-expanded.component.scss'],
})
export class SearchExpandedComponent implements OnInit {
  faSearch = faSearch;
  activeModule: string | null = null;
  @Input() filterBy!: FilterBy;
  onChangeActiveModule(module: string) {
    console.log('module:', module);
    this.activeModule = module;
  }
  ngOnInit(): void {
    console.log('this.filterBy:', this.filterBy);
  }
}
