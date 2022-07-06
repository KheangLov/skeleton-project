import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { join, map, drop } from 'lodash';

import { ILayoutVersion, IMenu } from 'src/app/types/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() rightMenuList: Array<IMenu> = [];

  @Input() leftMenuList: Array<IMenu> = [];

  url: ILayoutVersion = {
    text: '',
    path: '',
  };

  constructor(private _route: ActivatedRoute) {
    this._subcribeUrl();
  }

  private _subcribeUrl(): void {
    this._route.url
      .subscribe(urls => {
        const { path: _firstSegement } = urls[0];
        let text = 'V2';
        let path = '/v2';
        let _paths = map(urls, url => url.path);

        if (_firstSegement === 'v2') {
          text = 'V1';
          path = '';
          _paths = drop(_paths);
        }

        path += `/${join(_paths, '/')}`;

        this.url = { text, path };
      });
  }

}
