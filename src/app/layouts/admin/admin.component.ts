import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { IMenu } from 'src/app/types/core';
import { Admin } from '../admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends Admin {

  menuList: Array<IMenu> = [
    {
      text: 'Logout',
      action: () => this._authService.doLogout(),
    }
  ];

  constructor(_authService: AuthService) {
    super(_authService);
  }

}
