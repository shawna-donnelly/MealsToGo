import { Header } from "@react-navigation/stack";
import { SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components/native";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  ${Header.currentHeight && `margin-top: ${Header.currentHeight}px`};
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
