import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmpty } from 'lodash';

import { getFieldErrorMessage } from 'src/app/helpers/validation';
import { 
  IAttribute, 
  IFormgroupModified, 
  IOption, 
  MATERIAL_INPUT_APPERANCE, 
} from 'src/app/types/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() label: string = '';

  @Input() name: string = '';

  @Input() formGroup: IFormgroupModified = {
    modifiedAt: new Date(),
    value: new FormGroup({}),
  };

  @Input() appearance: MATERIAL_INPUT_APPERANCE = 'outline';

  @Input() attributes: Array<IAttribute> = [];

  @Input() wrapperAttributes: Array<IAttribute> = [];

  @Input() options: Array<IOption> = [];

  error: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (!isEmpty(changes['formGroup'])) {
      const { name } = this;
      const _formControl: any = this.formControl;

      this.error = getFieldErrorMessage(_formControl[name]);
    }
  }

  get formControl() {
    return this.formGroup.value.controls;
  }

}
