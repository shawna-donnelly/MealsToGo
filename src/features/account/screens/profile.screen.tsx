import React, { useContext } from "react";
import {
  LogoutAccountContainer,
  AuthButton,
  Title,
} from "../components/styles";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Spacer } from "../../../components/spacer";

export const ProfileScreen = ({}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { onLogout } = useContext(AuthenticationContext);

  return (
    <LogoutAccountContainer>
      <Title>Meals To Go</Title>
      <Spacer position={"top"} size="medium">
        <AuthButton
          onPress={async () => {
            await onLogout();
          }}
        >
          LOGOUT
        </AuthButton>
      </Spacer>
    </LogoutAccountContainer>
  );
};
