import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { passwordMatchingValidatior } from 'src/app/helpers/validation';
import { UserService } from 'src/app/services/user.service';
import { IFormgroupModified } from 'src/app/types/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnDestroy {

  createForm: IFormgroupModified = {
    modifiedAt: new Date(),
    value: new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }, passwordMatchingValidatior),
  };

  protected _onDestroy$: Subject<void> = new Subject<void>();
  
  constructor(private _userService: UserService) {
    this._subscribeFormValueChanged();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onSubmit(formData: any) {
    this._userService.create(formData)
      .subscribe(data => console.log(data));
  }

  private _subscribeFormValueChanged() {
    this.createForm.value.valueChanges
      .pipe(
        takeUntil(this._onDestroy$)
      )
      .subscribe(() => this._setCreateFormData(this.createForm.value));
  }

  private _setCreateFormData(value: FormGroup) {
    this.createForm = {
      modifiedAt: new Date(),
      value,
    };
  }

}
