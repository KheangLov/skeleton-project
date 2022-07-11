import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter as ldFilter, isEmpty, remove, upperCase } from 'lodash';
import { Subject, takeUntil, filter, map, Observable, of, mergeMap } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/molecules/confirm-dialog/confirm-dialog.component';

import { DialogComponent } from 'src/app/components/molecules/dialog/dialog.component';
import { formatUTCToLocal, isEmptyValue } from 'src/app/helpers/core';
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
      action: (row: IUser) => this.editUser('edit', row),
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
    this._subscribeUserData();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  editUser(action: string, row: any = {}) {
    const entity = 'user';
    const component = `${entity}_edit`;
    const data = { 
      action, 
      row, 
      component,
      entity,
      initKeys: [
        {
          type: 'default',
          variable: 'contentData',
        },
        {
          type: 'form',
          variable: 'editInfoForm',
          keys: ['name', 'email']
        },
      ],
    };
    const _dialogRef = this._dialog.open(DialogComponent, { data });

    _dialogRef.afterClosed()
      .pipe(
        filter(data => !isEmpty(data)),
      )
      .subscribe((result: any) => {
        if (!isEmpty(result.data)) {
          const { data } = result;
          remove(this.users, ['id', data.id]);
          this.users = [data, ...this.users];
        }
      });
  }

  deleteUser(user: IUser) {
    const data = {
      title: 'Are you sure you want to delete this user?',
      data: user
    };
    const _dialogRef = this._dialog.open(ConfirmDialogComponent, { data });

    _dialogRef.afterClosed()
      .pipe(
        filter(data => !isEmpty(data)),
        mergeMap(this._removeUser.bind(this))
      )
      .subscribe();
  }

  private _removeUser(user: IUser): Observable<any> {
    this._userService.delete(user)
      .subscribe(() => {
        this.users = ldFilter(this.users, ({ id }: IUser) => id !== user.id);
        this.resultLength -= 1;
      });
    
    return of(null);
  }

  private _subscribeUserData(): void {
    this._coreService.userData$
      .pipe(
        filter((value: any) => !isEmpty(value)),
        takeUntil(this._onDestroy$)
      )
      .subscribe(value => this._appendUserToList(value));
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

  private _appendUserToList(user: IUser) {
    this.users = [user, ...this.users];
    this.resultLength += 1;
  }

}
