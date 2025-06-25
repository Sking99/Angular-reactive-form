import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function noSpaceAllowed(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (typeof value === 'string' && value.includes(' ')) {
        return { noSpaceAllowed: true };
    }
    return null;
    }
}