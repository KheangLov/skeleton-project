import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { forEach, isEmpty } from 'lodash';

import { IAttribute } from '../types/core';

@Directive({
  selector: '[appDynamicAttr]'
})
export class DynamicAttrDirective implements AfterViewInit {

  @Input() attributeList: Array<IAttribute> = [];

  constructor(
    private _host: ElementRef, 
    private _renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this._initAttrs(this._host.nativeElement);
  }

  private _initAttrs(element: HTMLElement): void {
    forEach(
      this.attributeList, 
      ({ name, value }: IAttribute) => {
        const _classes = element.getAttribute(name);
        let _value = value;

        if (!isEmpty(_classes)) {
          _value += ` ${_classes}`;
        }

        this._renderer.setAttribute(element, name, _value);
      }
    );
  }

}
