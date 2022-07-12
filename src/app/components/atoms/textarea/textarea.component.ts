import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmpty } from 'lodash';

import { getFieldErrorMessage } from 'src/app/helpers/validation';
import { 
  HTML_INPUT_TYPE, 
  IAttribute, 
  IFormgroupModified, 
  MATERIAL_INPUT_APPERANCE, 
} from 'src/app/types/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnChanges {

  @Input() label: string = '';

  @Input() name: string = '';

  @Input() formGroup: IFormgroupModified = {
    modifiedAt: new Date(),
    value: new FormGroup({}),
  };

  @Input() appearance: MATERIAL_INPUT_APPERANCE = 'outline';

  @Input() attributes: Array<IAttribute> = [];

  @Input() wrapperAttributes: Array<IAttribute> = [];

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
