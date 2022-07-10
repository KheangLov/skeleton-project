import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isEmpty, upperCase } from 'lodash';
import { Subject, takeUntil, filter, map, Observable, of, take, debounceTime, distinctUntilChanged, interval, debounce, timer } from 'rxjs';
import { DialogComponent } from 'src/app/components/molecules/dialog/dialog.component';

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

  isLoadingResults = true;

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

  actions: Array<any> = [
    {
      text: 'Edit',
      icon: '',
      action: (row: any) => this.openDialog('update', row),
    }
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

  openDialog(action: string, row: any = {}) {
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
    this._userService.getUsers(param!)
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
