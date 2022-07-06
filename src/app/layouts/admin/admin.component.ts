import { Component, OnInit } from '@angular/core';
import { IBreadcrumb, IMenu } from 'src/app/types/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  sidebarMenuList: Array<IMenu> = [
    {
      text: 'Dashboard',
      link: '/dashboard',
      icon: 'dashboard',
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
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
