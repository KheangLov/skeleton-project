import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Inject, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNil } from 'lodash';

import { UserCreateComponent } from 'src/app/pages/admin/user/user-create/user-create.component';
import { IDialogData } from 'src/app/types/core';

const COMPONENTS: { [key: string]: any } = {
  ['user_create']: UserCreateComponent,
};

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit {

  @ViewChild('formContent', { read: ViewContainerRef, static: false }) formContent!: ViewContainerRef;

  hide = true;

  action = '';

  entity = '';

  componentName = '';

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    public dialogRef: MatDialogRef<DialogComponent>,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    const { action, entity, component } = data;

    this.action = action;
    this.entity = entity;
    
    if (!isNil(component)) {
      this.componentName = component!;
    }
  }

  ngAfterViewInit(): void {
    if (!isNil(this.componentName)) {
      const _component = COMPONENTS[this.componentName];

      this._loadComponent(_component);
      this._changeDetectorRef.detectChanges();
    }
  }

  private _loadComponent(component: any) {
    const _componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);

    this.formContent.createComponent(_componentFactory);
  }

}
