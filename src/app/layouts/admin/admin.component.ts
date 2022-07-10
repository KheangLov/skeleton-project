import { Component } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { last } from 'lodash';

import { AuthService } from 'src/app/services/auth.service';
import { IMenu } from 'src/app/types/core';
import { Admin } from '../admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends Admin {

  slug = '';

  menuList: Array<IMenu> = [
    {
      text: 'Profile',
      icon: 'person',
      action: () => console.log('Profile'),
    },
    {
      text: 'Logout',
      icon: 'logout',
      action: () => this._authService.doLogout(),
    },
  ];

  constructor(
    private _route: ActivatedRoute,
    authService: AuthService,
  ) {
    super(authService);

    this._subcribeUrl();
  }

  private _subcribeUrl(): void {
    this._route.url
      .subscribe((urls: Array<UrlSegment>) => {
        const { path } = last(urls)!;

        if (['user', 'attendance'].includes(path)) {
          this.slug = path;
        }
      });
  }

}
