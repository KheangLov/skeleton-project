import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from '../layouts/admin/admin.component';
import { AuthComponent } from '../layouts/auth/auth.component';
import { BreadcrumbComponent } from '../layouts/partials/breadcrumb/breadcrumb.component';
import { NavbarComponent } from '../layouts/partials/navbar/navbar.component';
import { SidebarComponent } from '../layouts/partials/sidebar/sidebar.component';
import { MaterialModule } from './material.module';

const components = [
  AdminComponent,
  AuthComponent,
  NavbarComponent,
  SidebarComponent,
  BreadcrumbComponent,
];

@NgModule({
  declarations: components,
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: components,
})
export class LayoutModule {}