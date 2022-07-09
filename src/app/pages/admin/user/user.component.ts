import { Component, OnDestroy } from '@angular/core';
import { isEmpty, upperCase } from 'lodash';
import { Subject, takeUntil, filter, map, Observable, of } from 'rxjs';

import { CoreService } from 'src/app/services/core.service';
import { UserService } from 'src/app/services/user.service';
import { IColumn } from 'src/app/types/core';
import { IList, IUser, IUserResponse } from 'src/app/types/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnDestroy {

  users: Array<IUser> = [];

  resultLength = 0;

  columns: Array<IColumn> = [
    {
      columnDef: 'id',
      header: 'ID',
      isHidden: true,
      cell: (element: IUser) => element.id,
    },
    {
      columnDef: 'name',
      header: 'Name',
      isHidden: false,
      cell: (element: IUser) => element.name,
    },
    {
      columnDef: 'email',
      header: 'Email',
      isHidden: false,
      cell: (element: IUser) => element.email,
    },
    {
      columnDef: 'role',
      header: 'Role',
      isHidden: false,
      cell: (element: IUser) => upperCase(element.role),
    },
    {
      columnDef: 'createdAt',
      header: 'Created At',
      isHidden: false,
      cell: (element: IUser) => element.createdAt,
    },
    {
      columnDef: 'updatedAt',
      header: 'Updated At',
      isHidden: false,
      cell: (element: IUser) => element.updatedAt,
    },
  ];

  protected _onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private _userService: UserService,
    private _coreService: CoreService
  ) {
    this._subscribeListParam();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  private _subscribeListParam(): void {
    this._coreService.listParam$
      .pipe(
        filter(value => !isEmpty(value)),
        map(this._getUserList.bind(this)),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  private _getUserList(param: IList | null | undefined): Observable<null> {
    this._userService.getUsers(param!)
      .subscribe(({ data, meta: { total } }: IUserResponse) => {
        this.users = data;
        this.resultLength = total;
      });
    
    return of(null);
  }

}
