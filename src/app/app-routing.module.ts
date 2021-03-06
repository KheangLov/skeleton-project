import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './middlewares/guards/auth.guard';
import { PermissionGuard } from './middlewares/guards/permission.guard';
import { DashboardV2Component } from './pages/admin/dashboard-v2/dashboard-v2.component';
import { DashboardV3Component } from './pages/admin/dashboard-v3/dashboard-v3.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserV2Component } from './pages/admin/user-v2/user-v2.component';
import { UserV3Component } from './pages/admin/user-v3/user-v3.component';
import { UserComponent } from './pages/admin/user/user.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PREFIX_ROUTE } from './helpers/core';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AttendanceComponent } from './pages/admin/attendance/attendance.component';
import { ClockInComponent } from './pages/admin/clock-in/clock-in.component';
import { UserGuard } from './middlewares/guards/user.guard';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { LoggedGuard } from './middlewares/guards/logged.guard';

const redirectToLogin = `/${PREFIX_ROUTE}/login`;

const routes: Routes = [
  {
    path: '',
    redirectTo: redirectToLogin,
    pathMatch: 'full'
  },
  {
    path: PREFIX_ROUTE,
    children: [
      {
        path: '',
        redirectTo: redirectToLogin,
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [LoggedGuard, PermissionGuard],
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [LoggedGuard, PermissionGuard],
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
        canActivate: [LoggedGuard, PermissionGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [LoggedGuard],
      },
      {
        path: 'clock-in',
        component: ClockInComponent,
        canActivate: [LoggedGuard, UserGuard],
      },
      {
        path: 'v2',
        children: [
          {
            path: 'dashboard',
            component: DashboardV2Component,
            canActivate: [LoggedGuard, PermissionGuard],
          },
          {
            path: 'user',
            component: UserV2Component,
            canActivate: [LoggedGuard, PermissionGuard],
          },
        ]
      },
      {
        path: 'v3',
        children: [
          {
            path: 'dashboard',
            component: DashboardV3Component,
            canActivate: [LoggedGuard, PermissionGuard],
          },
          {
            path: 'user',
            component: UserV3Component,
            canActivate: [LoggedGuard, PermissionGuard],
          },
        ]
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
