import { Component, Input } from '@angular/core';

import { IMenu } from 'src/app/types/core';

@Component({
  selector: 'app-sidebar-v2',
  templateUrl: './sidebar-v2.component.html',
  styleUrls: ['./sidebar-v2.component.scss']
})
export class SidebarV2Component {

  @Input() menuList: Array<IMenu> = [];

}
