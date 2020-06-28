export interface ISignInForm {
  email: string;
  password: string;
}

export class SignInForm implements ISignInForm {
  public email: string = "";
  public password: string = "";

  constructor(dto: ISignInForm) {
    this.email = dto.email;
    this.password = dto.password;
  }
}
