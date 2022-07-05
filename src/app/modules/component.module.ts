import { NgModule } from '@angular/core';

import { AtomModule } from './atom.module';
import { MoleculeModule } from './molecule.module';

const modules = [AtomModule, MoleculeModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class ComponentModule {}