import { passwordValidator, emailValidator } from "utils/validatorHelpers";

export interface IRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegistrationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export class RegistrationForm implements IRegistrationForm {
  public firstName: string = "";
  public lastName: string = "";
  public email: string = "";
  public password: string = "";

  constructor(dto: IRegistrationForm) {
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.email = dto.email;
    this.password = dto.password;
  }

  validate() {
    let errors: RegistrationErrors = {};

    errors.firstName = this.validateFirstName();
    errors.lastName = this.validateLastName();
    errors.email = this.validateEmail();
    errors.password = this.validatePassword();

    return errors;
  }

  validateFirstName() {
    if (!this.firstName || this.firstName.length === 0) {
      return "First name is required";
    }
  }

  validateLastName() {
    if (!this.lastName || this.lastName.length === 0) {
      return "Last name is required";
    }
  }

  validateEmail() {
    return emailValidator(this.email);
  }

  validatePassword() {
    return passwordValidator(this.password);
  }
}
