import { ValidationErrors, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('password_confirmation');

  return password?.value === confirmPassword?.value ? null : { notmatched: true };
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
    default:
      return message;
  }
}