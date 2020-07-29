export class UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  hue: number;

  constructor(firstName: string, lastName: string, email: string, id: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.id = id;
    this.hue = this.chooseHue(id);
  }

  private chooseHue(id: string): number {
    var hash = 0;
    for (var i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash % 360;
  }

  public getInitials(): string {
    return this.firstName.substring(0, 1) + this.lastName.substring(0, 1);
  }

  public getHSL(saturation: number, lightness: number) {
    return "hsl(" + this.hue + "," + saturation + "%," + lightness + "%)";
  }
}

export function cognitoUserToUserDTO(cognitoUser: any): UserDTO {
  const {
    "custom:firstName": firstName,
    "custom:lastName": lastName,
    email,
    sub,
  } = cognitoUser?.attributes;

  return new UserDTO(firstName, lastName, email, sub);
}
