import { AuthService } from "../services/auth.service";
import { IMenu, IBreadcrumb } from "../types/core";

export class Admin {
  
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
      action: () => this._authService.doLogout(),
    }
  ];

  leftMenuList: Array<IMenu> = [];

  breadcrumbList: Array<IBreadcrumb> = [
    {
      text: 'Admin',
      link: '/'
    },
    {
      text: 'Dashboard',
    },
  ];

  constructor(protected _authService: AuthService) {}

}