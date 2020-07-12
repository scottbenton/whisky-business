export interface ISignInForm {
  email: string;
  password: string;
}

export interface SignInErrors {
  email?: string;
  password?: string;
}

export class SignInForm implements ISignInForm {
  public email: string = "";
  public password: string = "";

  constructor(dto: ISignInForm) {
    this.email = dto.email;
    this.password = dto.password;
  }

  public validate() {
    const errors: SignInErrors = {};

    if (!this.email) {
      errors.email = "Email is required";
    }
    if (!this.password) {
      errors.password = "Password is required";
    }

    return errors;
  }
}
