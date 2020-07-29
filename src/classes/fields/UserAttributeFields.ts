export interface IUserAttributeFields {
  firstName: string;
  lastName: string;
}

interface UserAttributeErrors {
  firstName?: string;
  lastName?: string;
}

export class UserAttributeFields implements IUserAttributeFields {
  firstName: string;
  lastName: string;

  constructor(fields: IUserAttributeFields) {
    this.firstName = fields.firstName;
    this.lastName = fields.lastName;
  }

  validate() {
    const errors: UserAttributeErrors = {};
    if (!this.firstName || this.firstName.length === 0) {
      errors.firstName = "First name is required";
    }
    if (!this.lastName || this.lastName.length === 0) {
      errors.lastName = "Last name is required";
    }

    return errors;
  }
}
