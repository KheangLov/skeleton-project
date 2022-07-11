import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { last } from 'lodash';
import { DialogComponent } from 'src/app/components/molecules/dialog/dialog.component';

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
      text: this._authService.currentUser.name,
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
    private _dialog: MatDialog,
    authService: AuthService,
  ) {
    super(authService);

    this._subcribeUrl();
  }

  create(row: any = {}) {
    const { slug: entity } = this;
    const component = `${entity}_create`;
    const data = { 
      action: 'create', 
      row,
      entity,
      component,
    };
    const _dialogRef = this._dialog.open(DialogComponent, { data });

    _dialogRef.afterClosed()
      .subscribe(result => {
        console.log(result);
      });
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
