import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"


export function validValidator(): ValidatorFn {
    return (Control: AbstractControl): null | ValidationErrors => {
        if (Control.value.includes('valid')) {
            return null
        }
        else {
            return {
                validValidator: Control.value
            }
        }

    }
}
