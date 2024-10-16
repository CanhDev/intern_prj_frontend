import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createpasswordMatchValidatorv2(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control.parent;
    if (!formGroup) {
      return null;
    }
    const password = formGroup.get('newPassword')?.value;  
    const confirmPassword = control.value;  

    if (!confirmPassword || password === confirmPassword) {
      return null;
    }

    return { passwordMismatch: true };
  };
}
