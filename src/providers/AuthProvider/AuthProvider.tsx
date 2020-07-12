import React, { useEffect } from "react";
import { AuthContext, defaultContextValues } from "./AuthContext";
import { Hub, Auth } from "aws-amplify";
import { UserDTO, cognitoUserToUserDTO } from "classes/dto/UserDTO";

export const AuthProvider: React.FC = (props) => {
  const { children } = props;

  const [user, setUser] = React.useState<UserDTO | undefined>();

  useEffect(() => {
    const authListener = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (user) {
          setUser(cognitoUserToUserDTO(user));
        } else {
          setUser(undefined);
        }
      } catch (e) {
        setUser(undefined);
      }
    };
    Hub.listen("auth", authListener);
    return () => {
      Hub.remove("auth", authListener);
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (user) {
          setUser(cognitoUserToUserDTO(user));
        }
      } catch (e) {
        setUser(undefined);
      }
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...defaultContextValues, user }}>
      {children}
    </AuthContext.Provider>
  );
};
