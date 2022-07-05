import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { forEach } from 'lodash';

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
      ({ name, value }: IAttribute) =>
        this._host.nativeElement[name] = value
    );
  }

}
