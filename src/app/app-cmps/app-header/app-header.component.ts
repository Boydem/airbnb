import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  isExpanded: boolean = false;
  // TODO : Make a store with ngRx , and import the filterBy
  //        or have the filterBy from an ovservable , see if it apply changes to the index
  //        it should actually , then why using ngrx ? check it out
}
