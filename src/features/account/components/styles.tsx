import { colors } from "../../../infrastructure/theme/colors";
import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.spacing.medium};
`;

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.spacing.large};
  margin-top: ${(props) => props.theme.spacing.medium};
`;
export const LogoutAccountContainer = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.7);
  align-items: center;
  justify-content: center;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.7);
`;

export const AuthButton = styled(Button).attrs({
  buttonColor: colors.brand.primary,
  mode: "contained",
  style: { zIndex: 1 },
})`
  border-radius: 5px;
  padding: ${(props) => props.theme.spacing.small};
`;

export const AuthInput = styled(TextInput)`
  height: 50px;
  width: 250px;
  margin-horizontal: ${(props) => props.theme.spacing.small};
  margin: ${(props) => props.theme.spacing.small};
`;

export const ErrorContainer = styled.View`
  max-width: 250px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.spacing.small};
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

export const Title = styled(Text)`
  font-size: 30px;
`;
