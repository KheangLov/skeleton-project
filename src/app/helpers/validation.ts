import { ValidationErrors, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { isEmpty, omit, remove } from 'lodash';

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('password_confirmation');
  let _passwordError: any = control.get('password')?.errors || {};
  let _confirmPasswordError: any = control.get('password_confirmation')?.errors || {};

  if (password?.value !== confirmPassword?.value) {
    _passwordError = { ..._passwordError, notmatched: true };
    _confirmPasswordError = { ..._confirmPasswordError, notmatched: true };
  } else {
    _passwordError = omit(_passwordError, ['notmatched']);
    _confirmPasswordError = omit(_confirmPasswordError, ['notmatched']);
  }

  if (isEmpty(_passwordError)) {
    _passwordError = null;
  }

  if (isEmpty(_confirmPasswordError)) {
    _confirmPasswordError = null;
  }

  password?.setErrors(_passwordError);
  confirmPassword?.setErrors(_confirmPasswordError);

  return null;
}

export const getFieldErrorMessage = (field: FormControl, message: string = ''): string => {
  switch (true) {
    case field.hasError('required'):
      return 'Field is requied!';
    case field.hasError('email'):
      return 'Email is invalid!';
    case field.hasError('minlength'):
      return 'Field minlength not match!';
    case field.hasError('server'):
      return field.errors?.['server'];
    case field.hasError('notmatched'):
      return 'Password not match!';
    default:
      return message;
  }
}