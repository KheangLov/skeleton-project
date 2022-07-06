import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { getFieldErrorMessage } from 'src/app/helpers/validation';
import { HTML_INPUT_TYPE, IAttribute, MATERIAL_INPUT_APPERANCE } from 'src/app/types/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnChanges {

  @Input() label: string = '';

  @Input() type: HTML_INPUT_TYPE = 'text';

  @Input() name: string = '';

  @Input() placeholder: string = '';

  @Input() formGroup: FormGroup = new FormGroup({});

  @Input() appearance: MATERIAL_INPUT_APPERANCE = 'outline';

  @Input() attributes: Array<IAttribute> = [];

  @Input() wrapperAttributes: Array<IAttribute> = [];

  error: string = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!_.isEmpty(changes['formGroup'])) {
      const { name } = this;
      const _formControl: any = this.formControl;

      this.error = getFieldErrorMessage(_formControl[name]);
    }
  }

  get formControl() {
    return this.formGroup.controls;
  }

}
