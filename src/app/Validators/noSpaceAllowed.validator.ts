import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static noSpaceAllowed(): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (typeof value === 'string' && value.includes(' ')) {
            return { noSpaceAllowed: true };
        }
        return null;
        }
    }

    static checkUserName(control: AbstractControl): Promise<any>{
        return userNameAllowed(control.value);
    }
} 

function userNameAllowed(userName: string){
    const userNames = ['admin', 'root', 'superuser'];
     return new Promise((resolve)=>{
        setTimeout(() => {
            if (userNames.includes(userName)) {
                resolve({ userNameAllowed: true });
            } else {
                resolve(null);
            }
        }, 5000);
     }) 
}