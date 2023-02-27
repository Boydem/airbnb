import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  faUser = faUser;
}
