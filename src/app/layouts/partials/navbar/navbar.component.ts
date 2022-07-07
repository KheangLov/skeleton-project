import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { join, map, drop, includes, omit, values } from 'lodash';

import { ILayoutVersion, IMenu } from 'src/app/types/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() rightMenuList: Array<IMenu> = [];

  @Input() leftMenuList: Array<IMenu> = [];

  urls: Array<ILayoutVersion> = [];

  constructor(private _route: ActivatedRoute) {
    this._subcribeUrl();
  }

  private _subcribeUrl(): void {
    this._route.url
      .subscribe(urls => {
        const { path: _firstSegement } = urls[0];
        let _objects: { [key: string]: any } = {
          v1: {
            text: 'V1',
            path: '',
          },
          v2: {
            text: 'V2',
            path: '/v2',
          },
          v3: {
            text: 'V3',
            path: '/v3',
          }
        };
        let _paths = map(urls, url => url.path);

        if (includes(['v2', 'v3'], _firstSegement)) {
          _objects = omit(_objects, [_firstSegement]);
          _paths = drop(_paths);
        } else {
          _objects = omit(_objects, ['v1']);
        }

        const _newObjects = map(values(_objects), _object => {
          _object.path += `/${join(_paths, '/')}`;
          return _object;
        });

        this.urls = [...this.urls, ..._newObjects];
      });
  }

}
