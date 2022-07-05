import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { forEach, isEmpty } from 'lodash';

import { IAttribute } from '../types/core';

@Directive({
  selector: '[appDynamicAttr]'
})
export class DynamicAttrDirective implements AfterViewInit {

  @Input() attributeList: Array<IAttribute> = [];

  constructor(private _host: ElementRef) { }

  ngAfterViewInit(): void {
    forEach(
      this.attributeList, 
      ({ name, value }: IAttribute) => {
        let _value = this._host.nativeElement[name].value;

        if (!isEmpty(_value)) {
          _value += ` ${value}`;
        } else {
          _value = value;
        }

        this._host.nativeElement[name] = _value;
      }
    );
  }

}
