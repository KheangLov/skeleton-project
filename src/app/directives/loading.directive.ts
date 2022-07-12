import { ComponentRef, Directive, Input, OnChanges, ViewContainerRef } from '@angular/core';

import { LoadingComponent } from '../components/atoms/loading/loading.component';
import { IAttribute } from '../types/core';

/**
 * @Directive Loading
 * 
 * @Inputs
 * 
 * @isEnabled for create or destroy loading component
 * @isSpinner for changing loading component to spinner or progress bar
 * @isHasOverlay for adding overlay background
 * @attributes for adding extra attributes, Note: can be any. (relate to dynamic-attr directive)
 * @color for change loading component's color
 * 
 */
@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnChanges {

  @Input() isEnabled: boolean = false;

  @Input() isSpinner: boolean = true;

  @Input() isHasOverlay: boolean = true;

  @Input() color: string = '';

  @Input() attributes: Array<IAttribute> = [];

  componentRef!: ComponentRef<any>;

  constructor(
    private _hostViewRef: ViewContainerRef,
  ) {}

  ngOnChanges(): void {
    if (this.isEnabled) {
      this._createLoading();
    } else {
      this._removeViewRef();
    }
  }

  private _removeViewRef() {
    this._hostViewRef.remove(0);
  }

  private _createLoading() {
    this.componentRef = this._hostViewRef.createComponent(LoadingComponent);

    this.componentRef.instance.color = this.color;
    this.componentRef.instance.isSpinner = this.isSpinner;
    this.componentRef.instance.isHasOverlay = this.isHasOverlay;
    this.componentRef.instance.attributes = this.attributes;
  }

}
