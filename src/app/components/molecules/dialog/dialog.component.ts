import { AfterViewInit, ChangeDetectorRef, Component, Inject, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forEach, isEmpty, isNil, pick } from 'lodash';
import { LateReasonComponent } from 'src/app/pages/admin/clock-in/late-reason/late-reason.component';

import { UserCreateComponent } from 'src/app/pages/admin/user/user-create/user-create.component';
import { UserEditComponent } from 'src/app/pages/admin/user/user-edit/user-edit.component';
import { IDialogData } from 'src/app/types/core';

const COMPONENTS: { [key: string]: any } = {
  ['user_create']: UserCreateComponent,
  ['user_edit']: UserEditComponent,
  ['late_reason']: LateReasonComponent,
};

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit {

  @ViewChild('formContent', { read: ViewContainerRef, static: false }) formContent!: ViewContainerRef;

  action = '';

  entity = '';

  componentName = '';

  contentData: any = null;

  initKeys: Array<any> | undefined = [];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    const { action, entity, row, component, initKeys } = data;

    this.action = action;
    this.entity = entity;
    this.contentData = row;
    this.initKeys = initKeys;

    if (!isNil(component)) {
      this.componentName = component!;
    }
  }

  ngAfterViewInit(): void {
    if (!isNil(this.componentName)) {
      this._loadComponent(this.componentName);
      this._changeDetectorRef.detectChanges();
    }
  }

  private _loadComponent(componentName: string) {
    const _component = COMPONENTS[componentName];

    const _componentRef: { [key: string]: any} = this.formContent.createComponent(_component);

    if (!isEmpty(this.initKeys)) {
      forEach(
        this.initKeys, 
        ({ type, variable, keys }: any) => {
          switch (type) {
            case 'form':
              _componentRef['instance'][variable].value
                .patchValue(pick(this.contentData, keys))
              break
            default:
              _componentRef['instance'][variable] = this.contentData;
              break;
          }
        }
      );
    }
  }

}
