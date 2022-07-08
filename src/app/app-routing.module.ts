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

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
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
    canActivate: [PermissionGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [PermissionGuard],
  },
  {
    path: 'v2/dashboard',
    component: DashboardV2Component,
    canActivate: [PermissionGuard],
  },
  {
    path: 'v2/user',
    component: UserV2Component,
    canActivate: [PermissionGuard],
  },
  {
    path: 'v3/dashboard',
    component: DashboardV3Component,
    canActivate: [PermissionGuard],
  },
  {
    path: 'v3/user',
    component: UserV3Component,
    canActivate: [PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
