import { emailValidator, passwordValidator } from "utils/validatorHelpers";

export interface IForgotPasswordFields {
  email: string;
  code?: string;
  newPassword?: string;
}

export interface ForgotPasswordErrors {
  email?: string;
  code?: string;
  newPassword?: string;
}

export class ForgotPasswordFields implements IForgotPasswordFields {
  email: string;
  code?: string;
  newPassword?: string;

  constructor(fields: IForgotPasswordFields) {
    this.email = fields.email;
    this.code = fields.code;
    this.newPassword = fields.newPassword;
  }

  public validate(): ForgotPasswordErrors {
    let errors: ForgotPasswordErrors = {};

    errors.email = emailValidator(this.email);

    if (!this.code || this.code.length === 0) {
      errors.code = "Code is required.";
    }

    errors.newPassword = passwordValidator(this.newPassword);

    return errors;
  }
}
