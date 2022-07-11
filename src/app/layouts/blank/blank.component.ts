import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PREFIX_ROUTE } from 'src/app/helpers/core';
import { AuthService } from 'src/app/services/auth.service';
import { IMenu } from 'src/app/types/core';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent {

  menuList: Array<IMenu> = [
    {
      text: this._authService.currentUser.name,
      icon: 'person',
      action: () => this._router.navigate([`${PREFIX_ROUTE}/profile`]),
    },
    {
      text: 'Logout',
      icon: 'logout',
      action: () => this._authService.doLogout(),
    },
  ];

  sidebarMenuList: Array<IMenu> = [
    {
      text: 'Clock-IN',
      link: `/${PREFIX_ROUTE}/clock-in`,
      icon: 'fact_check',
    },
    {
      text: 'Profile',
      link: `/${PREFIX_ROUTE}/profile`,
      icon: 'person_outline',
    },
  ];

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) {}

}
