import { Component } from '@angular/core';

import { IBreadcrumb, IMenu } from 'src/app/types/core';

@Component({
  selector: 'app-admin-v2',
  templateUrl: './admin-v2.component.html',
  styleUrls: ['./admin-v2.component.scss']
})
export class AdminV2Component {

  sidebarMenuList: Array<IMenu> = [
    {
      text: 'Dashboard',
      link: '/dashboard',
      icon: 'dashboard',
    },
    {
      text: 'User',
      link: '/user',
      icon: 'person icon',
    }
  ];

  rightMenuList: Array<IMenu> = [
    {
      text: 'Logout',
      action: () => {
        console.log('Logged out');
      }
    }
  ];

  leftMenuList: Array<IMenu> = [
    {
      text: 'Kheang',
    }
  ];

  breadcrumbList: Array<IBreadcrumb> = [
    {
      text: 'Admin',
      link: '/'
    },
    {
      text: 'Dashboard',
    },
  ];

}
