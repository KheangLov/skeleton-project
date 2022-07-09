import { AuthService } from "../services/auth.service";
import { IMenu, IBreadcrumb } from "../types/core";
import { PREFIX_ROUTE } from "../helpers/core";

export class Admin {
  
  prefixRoute: string = PREFIX_ROUTE;

  sidebarMenuList: Array<IMenu> = [
    {
      text: 'Dashboard',
      link: `/${PREFIX_ROUTE}/dashboard`,
      icon: 'dashboard',
    },
    {
      text: 'User',
      link: `/${PREFIX_ROUTE}/user`,
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