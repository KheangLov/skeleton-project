import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from '../components/molecules/form/form.component';
import { TabComponent } from '../components/molecules/tab/tab.component';
import { TableComponent } from '../components/molecules/table/table.component';
import { DialogComponent } from '../components/molecules/dialog/dialog.component';
import { MaterialModule } from './material.module';

const components = [
  DialogComponent,
  FormComponent,
  TabComponent,
  TableComponent,
];

@NgModule({
  declarations: components,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: components,
})
export class MoleculeModule {}