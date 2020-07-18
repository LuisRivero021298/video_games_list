import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const RatingValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const rating = control.get("rating");

  return rating.value > 10 ? { invalidRating: true } : null;
};
