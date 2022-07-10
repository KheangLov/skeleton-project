import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isEmpty, upperCase } from 'lodash';
import { Subject, takeUntil, filter, map, Observable, of, take, debounceTime, distinctUntilChanged, interval, debounce, timer } from 'rxjs';
import { DialogComponent } from 'src/app/components/molecules/dialog/dialog.component';
import { formatUTCToLocal } from 'src/app/helpers/core';

import { CoreService } from 'src/app/services/core.service';
import { UserService } from 'src/app/services/user.service';
import { IAction, IColumn } from 'src/app/types/core';
import { IList, IUser, IUserResponse } from 'src/app/types/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnDestroy {

  users: Array<IUser> = [];

  resultLength = 0;

  isLoadingResults = true;

  columns: Array<IColumn> = [
    {
      columnDef: 'id',
      header: 'ID',
      isHidden: true,
      cell: ({ id }: IUser) => id,
    },
    {
      columnDef: 'name',
      header: 'Name',
      isHidden: false,
      cell: ({ name }: IUser) => name,
    },
    {
      columnDef: 'email',
      header: 'Email',
      isHidden: false,
      cell: ({ email }: IUser) => email,
    },
    {
      columnDef: 'role',
      header: 'Role',
      isHidden: false,
      cell: ({ role }: IUser) => upperCase(role),
    },
    {
      columnDef: 'createdAt',
      header: 'Created At',
      isHidden: false,
      cell: ({ createdAt }: IUser) => formatUTCToLocal(createdAt),
    },
    {
      columnDef: 'updatedAt',
      header: 'Updated At',
      isHidden: false,
      cell: ({ updatedAt }: IUser) => formatUTCToLocal(updatedAt),
    },
  ];

  actions: Array<IAction> = [
    {
      text: 'Edit',
      icon: 'edit',
      action: (row: IUser) => this.editUser('update', row),
    },
    {
      text: 'Delete',
      icon: 'delete',
      action: (row: IUser) => this.deleteUser(row),
    },
  ];

  protected _onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private _userService: UserService,
    private _coreService: CoreService,
    private _dialog: MatDialog,
  ) {
    this._subscribeListParam();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  editUser(action: string, row: any = {}) {
    const data = { 
      action, 
      row, 
      originalform: this.users, 
      entity: 'user' 
    };
    const _dialogRef = this._dialog.open(DialogComponent, { data });

    _dialogRef.afterClosed()
      .subscribe(result => {
        console.log(result);
      });
  }

  deleteUser(user: IUser) {
    this._userService.delete(user)
      .subscribe(result => console.log(result));
  }

  private _subscribeListParam(): void {
    this._coreService.listParam$
      .pipe(
        debounce(() => timer(1000)),
        filter(value => !isEmpty(value)),
        map(this._getUserList.bind(this)),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  private _getUserList(param: IList | null | undefined): Observable<null> {
    this.isLoadingResults = true;
    this._userService.getList(param!)
      .pipe(
        filter(value => !isEmpty(value))
      )
      .subscribe(({ data, meta: { total } }: IUserResponse) => {
        this.users = data;
        this.resultLength = total;
        this.isLoadingResults = false;
      });
    
    return of(null);
  }

}
