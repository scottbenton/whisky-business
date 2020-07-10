import React from "react";
import { Form } from "react-final-form";
import {
  IUserAttributeFields,
  UserAttributeFields,
} from "classes/fields/UserAttributeFields";
import { TextFormField } from "components/shared/TextInput/TextFormField";
import { useAuth } from "providers/AuthProvider";
import { Button } from "components/shared/Button";
import { FormSection } from "components/shared/FormSection";
import { Dialog } from "components/shared/Dialog";
import { IPasswordFields, PasswordFields } from "classes/fields/PasswordFields";
import { Alert } from "components/shared/Alert";

const handleAttributeValidate = async (fields: IUserAttributeFields) => {
  const attributes = new UserAttributeFields(fields);
  return attributes.validate();
};
const handlePasswordChangeValidate = async (fields: IPasswordFields) => {
  const passwords = new PasswordFields(fields);
  return passwords.validate();
};

export const Settings: React.FC = (props) => {
  const { user, updatePassword, updateAttributes } = useAuth();
  const [changePassOpen, setChangePassOpen] = React.useState<boolean>(false);
  const [changePasswordErrors, setChangePasswordErrors] = React.useState<
    Error | undefined
  >();
  const [changeAttributeErrors, setChangeAttributeErrors] = React.useState<
    Error | undefined
  >();

  const handleAttributeSubmit = (fields: IUserAttributeFields) => {
    setChangeAttributeErrors(undefined);
    const attributeFields = new UserAttributeFields(fields);
    updateAttributes(attributeFields).catch((e) => setChangeAttributeErrors(e));
  };
  const handlePasswordChangeSubmit = (fields: IPasswordFields) => {
    setChangePasswordErrors(undefined);
    const passwordFields = new PasswordFields(fields);
    updatePassword(passwordFields)
      .then(() => {
        setChangePassOpen(false);
      })
      .catch((e) => {
        setChangePasswordErrors(e);
      });
  };

  return (
    <>
      <Dialog
        open={changePassOpen}
        setOpen={setChangePassOpen}
        className={"p-6 flex flex-col w-full max-w-xl"}
      >
        <span className={"text-xl font-semibold"}>Change Password</span>
        {changePasswordErrors && (
          <Alert
            type={"error"}
            title={"Error changing your password"}
            message={changePasswordErrors.message}
          />
        )}
        <Form
          onSubmit={handlePasswordChangeSubmit}
          validate={handlePasswordChangeValidate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className={"flex flex-col mt-4"}>
                <TextFormField
                  id={"old-password"}
                  label={"Current Password"}
                  fieldName={"oldPassword"}
                  type={"password"}
                />
                <TextFormField
                  id={"new-password"}
                  label={"New Password"}
                  fieldName={"newPassword"}
                  type={"password"}
                />
                <div className={"flex justify-end flex-wrap mt-4"}>
                  <Button
                    id={"cancel-password"}
                    onClick={() => setChangePassOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    id={"change-password"}
                    variant={"primary"}
                    type={"submit"}
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </form>
          )}
        />
      </Dialog>
      <FormSection
        title={"Authentication Settings"}
        description={"Manage how you sign into Whisky Business"}
      >
        <>
          <div className={"flex flex-col"}>
            <span className={"text-gray-700 text-sm font-bold"}>Email</span>
            <span className={"px-4 py-3 text-lg font-semibold"}>
              {user?.email}
            </span>
            <span className={"text-sm text-gray-700"}>
              *Email is not yet editable
            </span>
          </div>
          <div className={"pt-6"}>
            <span className={"text-gray-700 text-sm font-bold"}>Password</span>
            <Button
              id={"password-change"}
              variant={"secondary"}
              onClick={() => setChangePassOpen(true)}
            >
              Change Password
            </Button>
          </div>
        </>
      </FormSection>
      <FormSection title={"Profile"} description={"A bit about yourself!"}>
        {changeAttributeErrors && (
          <Alert
            type={"error"}
            title={"Error updating Profile"}
            message={changeAttributeErrors.message}
          />
        )}
        <Form
          initialValues={{
            firstName: user?.firstName,
            lastName: user?.lastName,
          }}
          onSubmit={handleAttributeSubmit}
          validate={handleAttributeValidate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextFormField
                id={"first-name"}
                label="First Name"
                fieldName={"firstName"}
                required
              />
              <TextFormField
                id={"last-name"}
                label={"Last Name"}
                fieldName={"lastName"}
                required
              />
              <div className={"flex pt-2 "}>
                <Button
                  id={"save-changes"}
                  type={"submit"}
                  variant={"secondary"}
                >
                  Update Profile
                </Button>
              </div>
            </form>
          )}
        />
      </FormSection>
    </>
  );
};
