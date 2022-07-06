import { Component } from '@angular/core';

import { IBreadcrumb, IMenu } from 'src/app/types/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

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
      text: 'Dashboard',
    },
  ];

}
