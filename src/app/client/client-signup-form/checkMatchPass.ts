import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createpasswordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control.parent;
    if (!formGroup) {
      return null;
    }
    const password = formGroup.get('password')?.value;  
    const confirmPassword = control.value;  

    if (!confirmPassword || password === confirmPassword) {
      return null;
    }

    return { passwordMismatch: true };
  };
}
