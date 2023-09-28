import React from "react";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/styles";
import { Spacer } from "../../../components/spacer";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Text } from "../../../components/typography";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export const RegisterScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { onRegister, error, isLoading } = React.useContext(
    AuthenticationContext
  );
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = React.useState<string>("");

  return (
    <AccountBackground source={{ uri: "" }}>
      <AccountCover />
      <Title>Meals To Go</Title>

      <AccountContainer>
        <AuthInput
          value={email}
          label="E-mail"
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <AuthInput
          value={password}
          secureTextEntry
          textContentType="password"
          label="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />
        <AuthInput
          value={repeatedPassword}
          secureTextEntry
          textContentType="password"
          label="Repeat Password"
          autoCapitalize="none"
          onChangeText={(text) => setRepeatedPassword(text)}
        />
        <Spacer position={"top"} size="small">
          {isLoading ? (
            <ActivityIndicator animating color={MD2Colors.blue300} />
          ) : (
            <AuthButton
              icon="email"
              onPress={async () => {
                await onRegister(email, password, repeatedPassword).catch((e) =>
                  console.log(e)
                );
              }}
            >
              REGISTER
            </AuthButton>
          )}
          {error && (
            <ErrorContainer>
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size={"medium"} position="top">
        <AuthButton onPress={() => navigation.goBack()}>Back</AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
