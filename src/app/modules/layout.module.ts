import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from '../layouts/admin/admin.component';
import { AuthComponent } from '../layouts/auth/auth.component';
import { BreadcrumbComponent } from '../layouts/partials/breadcrumb/breadcrumb.component';
import { NavbarComponent } from '../layouts/partials/navbar/navbar.component';
import { SidebarV2Component } from '../layouts/partials/sidebar-v2/sidebar-v2.component';
import { AdminV2Component } from '../layouts/admin-v2/admin-v2.component';
import { SidebarComponent } from '../layouts/partials/sidebar/sidebar.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const components = [
  AdminComponent,
  AuthComponent,
  NavbarComponent,
  SidebarComponent,
  BreadcrumbComponent,
  AdminV2Component,
  SidebarV2Component,
];

@NgModule({
  declarations: components,
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule],
  exports: components,
})
export class LayoutModule {}