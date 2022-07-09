import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DEFAULT_LIST_PARAM } from '../helpers/core';
import { IList } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  listParam$: BehaviorSubject<IList | undefined | null> = new BehaviorSubject<IList | undefined | null>(null);

  public setListParam(value: IList): void {
    this.listParam$.next(value);
  }

}
