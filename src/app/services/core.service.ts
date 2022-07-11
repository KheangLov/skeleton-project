import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IList, IUser } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  userData$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

  listParam$: BehaviorSubject<IList | undefined | null> = new BehaviorSubject<IList | undefined | null>(null);

  public setUserList(value: IUser) {
    this.userData$.next(value);
  }

  public setListParam(value: IList): void {
    this.listParam$.next(value);
  }

}
