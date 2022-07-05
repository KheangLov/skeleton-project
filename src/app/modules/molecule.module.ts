import { NgModule } from '@angular/core';

import { FormComponent } from '../components/molecules/form/form.component';
import { TabComponent } from '../components/molecules/tab/tab.component';

const components = [
  FormComponent,
  TabComponent,
];

@NgModule({
  declarations: components,
  exports: components,
})
export class MoleculeModule {}