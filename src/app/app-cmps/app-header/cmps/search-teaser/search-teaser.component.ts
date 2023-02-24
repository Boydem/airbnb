import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'search-teaser',
  templateUrl: './search-teaser.component.html',
  styleUrls: ['./search-teaser.component.scss'],
})
export class SearchTeaserComponent {
  faSearch = faSearch;
}
