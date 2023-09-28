import React from "react";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
} from "../components/styles";
import { Spacer } from "../../../components/spacer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

export const AccountScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  return (
    <AccountBackground source={{ uri: "" }}>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <Spacer position={"bottom"} size="medium">
          <AuthButton
            icon="lock-open-outline"
            onPress={() => navigation.navigate("Login")}
          >
            LOGIN
          </AuthButton>
        </Spacer>
        <AuthButton
          icon="email"
          onPress={() => navigation.navigate("Register")}
        >
          REGISTER
        </AuthButton>
      </AccountContainer>
    </AccountBackground>
  );
};
