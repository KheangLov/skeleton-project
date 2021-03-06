import { Component, Input } from '@angular/core';

import { IMenu } from 'src/app/types/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() menuList: Array<IMenu> = [];

}
