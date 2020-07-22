import { FormGroup } from '@angular/forms';

export function formInvalid(formControl: FormGroup) {
    const controls = formControl.controls;
    const invalid = Object.keys(controls)
        .map(control => controls[control].invalid)
        .some(invalid => invalid === true);
    return invalid
}

export function formTouchAll(formControl: FormGroup) {
    const controls = formControl.controls;
    Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
}