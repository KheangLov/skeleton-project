import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from '../components/molecules/form/form.component';
import { TabComponent } from '../components/molecules/tab/tab.component';

const components = [
  FormComponent,
  TabComponent,
];

@NgModule({
  declarations: components,
  imports: [FormsModule, ReactiveFormsModule],
  exports: components,
})
export class MoleculeModule {}