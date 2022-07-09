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
import { AdminV3Component } from '../layouts/admin-v3/admin-v3.component';
import { NavbarV2Component } from '../layouts/partials/navbar-v2/navbar-v2.component';
import { ContentComponent } from '../layouts/partials/content/content.component';
import { BodyComponent } from '../layouts/partials/body/body.component';
import { NavbarV3Component } from '../layouts/partials/navbar-v3/navbar-v3.component';
import { BottombarComponent } from '../layouts/partials/bottombar/bottombar.component';
import { BlankComponent } from '../layouts/blank/blank.component';

const components = [
  AdminComponent,
  AuthComponent,
  NavbarComponent,
  NavbarV2Component,
  NavbarV3Component,
  SidebarComponent,
  BreadcrumbComponent,
  AdminV2Component,
  SidebarV2Component,
  AdminV3Component,
  ContentComponent,
  BodyComponent,
  BottombarComponent,
  BlankComponent,
];

@NgModule({
  declarations: components,
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule],
  exports: components,
})
export class LayoutModule {}