import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from '../components/atoms/button/button.component';
import { InputComponent } from '../components/atoms/input/input.component';
import { LinkComponent } from '../components/atoms/link/link.component';
import { TextareaComponent } from '../components/atoms/textarea/textarea.component';
import { DynamicAttrDirective } from '../directives/dynamic-attr.directive';
import { MaterialModule } from './material.module';

const components = [
  ButtonComponent,
  InputComponent,
  LinkComponent,
  TextareaComponent,
];

@NgModule({
  declarations: [...components, DynamicAttrDirective],
  imports: [RouterModule, MaterialModule],
  exports: components,
})
export class AtomModule {}