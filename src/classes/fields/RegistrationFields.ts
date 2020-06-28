export interface IRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export class RegistrationForm implements IRegistrationForm {
  public firstName: string = "";
  public lastName: string = "";
  public email: string = "";
  public password: string = "";
  public confirmPassword: string = "";

  constructor(dto: IRegistrationForm) {
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.email = dto.email;
    this.password = dto.password;
    this.confirmPassword = dto.confirmPassword;
  }

  validate() {
    let errors: RegistrationErrors = {};

    errors.firstName = this.validateFirstName();
    errors.lastName = this.validateLastName();
    errors.email = this.validateEmail();
    errors.password = this.validatePassword();
    errors.confirmPassword = this.validateConfirmPassword();

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
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.email || !re.test(this.email.toLowerCase())) {
      return "Invalid Email";
    }
  }

  validatePassword() {
    if (!this.password) {
      return "Password is required";
    }

    const numberRegex = /(?=.*\d)/;
    const lowerCaseRegex = /(?=.*[a-z])/;
    const upperCaseRegex = /(?=.*[A-Z])/;

    if (this.password.length < 8) {
      return "Password must be at least 8 characters";
    } else if (!lowerCaseRegex.test(this.password)) {
      return "Password must have at least one lowercase letter";
    } else if (!upperCaseRegex.test(this.password)) {
      return "Password must have at least one uppercase letter";
    } else if (!numberRegex.test(this.password)) {
      return "Password must have at least one number";
    }
  }

  validateConfirmPassword() {
    if (
      !this.confirmPassword ||
      !this.password ||
      this.confirmPassword !== this.password
    ) {
      return "Passwords must match";
    }
  }
}
