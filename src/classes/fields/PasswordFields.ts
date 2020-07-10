import { passwordValidator } from "utils/validatorHelpers";

export interface IPasswordFields {
  oldPassword: string;
  newPassword: string;
}

interface PasswordFieldErrors {
  oldPassword?: string;
  newPassword?: string;
}

export class PasswordFields implements IPasswordFields {
  oldPassword: string;
  newPassword: string;

  constructor(fields: IPasswordFields) {
    this.oldPassword = fields.oldPassword;
    this.newPassword = fields.newPassword;
  }

  validate() {
    let errors: PasswordFieldErrors = {};

    if (!this.oldPassword || this.oldPassword.length === 0) {
      errors.oldPassword = "Current password is required";
    }

    errors.newPassword = passwordValidator(this.newPassword);

    return errors;
  }
}
