import { NgModule } from '@angular/core';

import { AdminComponent } from '../layouts/admin/admin.component';
import { AuthComponent } from '../layouts/auth/auth.component';
import { MaterialModule } from './material.module';

const components = [
  AdminComponent,
  AuthComponent,
];

@NgModule({
  declarations: components,
  imports: [MaterialModule],
  exports: components,
})
export class LayoutModule {}