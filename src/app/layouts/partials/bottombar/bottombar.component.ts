import { Component, Input, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { findKey, forEach, includes, keyBy } from 'lodash';

import { IMenu } from 'src/app/types/core';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.scss']
})
export class BottombarComponent implements OnDestroy {

  @Input() menuList: Array<IMenu> = [];

  stretch: any = null;

  protected _destroyed$: Subject<void> = new Subject<void>();

  private _displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(private _breakpointObserver: BreakpointObserver) {
    this._subscribeToBreakpoints();
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private _subscribeToBreakpoints() {
    const _breakPoints = [
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ];

    this._breakpointObserver.observe(_breakPoints)
      .pipe(takeUntil(this._destroyed$))
      .subscribe(result => this._checkScreen(result));
  }

  private _checkScreen({ breakpoints }: any): void {
    const _strectScreens = ['XSmall', 'Small'];
    const _bp: any = findKey(breakpoints, val => val);
    const _screen = this._displayNameMap.get(_bp);

    if (includes(_strectScreens, _screen)) {
      this.stretch = true;
    } else {
      this.stretch = null;
    }
  }

}
