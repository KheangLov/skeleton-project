import { Component } from '@angular/core';

import { IBreadcrumb, IMenu } from 'src/app/types/core';

@Component({
  selector: 'app-admin-v3',
  templateUrl: './admin-v3.component.html',
  styleUrls: ['./admin-v3.component.scss']
})
export class AdminV3Component {

  sidebarMenuList: Array<IMenu> = [
    {
      text: 'Dashboard',
      link: '/v3/dashboard',
      icon: 'dashboard',
    },
    {
      text: 'User',
      link: '/v3/user',
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
