import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputComponent } from '../components/atoms/input/input.component';
import { OverlayComponent } from '../components/atoms/overlay/overlay.component';
import { SelectComponent } from '../components/atoms/select/select.component';
import { TextareaComponent } from '../components/atoms/textarea/textarea.component';
import { DynamicAttrDirective } from '../directives/dynamic-attr.directive';
import { MaterialModule } from './material.module';

const components = [
  InputComponent,
  OverlayComponent,
  SelectComponent,
  TextareaComponent,
];

@NgModule({
  declarations: [...components, DynamicAttrDirective],
  imports: [RouterModule, MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: components,
})
export class AtomModule {}