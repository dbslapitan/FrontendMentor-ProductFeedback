import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map, Observable } from "rxjs";
import { HttpRequestsService } from "../services/http-requests.service";

export function usernameFormatError(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.match(/^[A-Za-z0-9._]+$/) ? null : {usernameFormatError: {value: control.value}};
  };
}

export function usernameExistError(httpRequestService: HttpRequestsService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return httpRequestService .checkUserAvailability(control.value).pipe(
      map(res => {
        // if res is true, username exists, return true
        return res.isFound ? { usernameExists: true } : null;
        // NB: Return null if there is no error
      })
    );
  };
}