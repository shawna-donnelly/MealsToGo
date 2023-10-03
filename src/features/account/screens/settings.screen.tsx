import React, { useContext } from "react";
import { List, Avatar } from "react-native-paper";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import styled from "styled-components/native";
import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer";
import { Text } from "../../../components/typography";

const SettingsIcon = ({
  icon,
  color = "black",
}: {
  icon: IconSource;
  color?: string;
}) => (
  <List.Icon
    icon={icon}
    color={color}
    style={{ opacity: color !== "black" ? 0.7 : 1 }}
  />
);

export const SettingsScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { onLogout, user } = useContext(AuthenticationContext);

  return (
    <SafeArea>
      <AvatarContainer>
        <AvatarIcon icon={"human"} />
        <Spacer size="medium" position="top">
          <Text variant="label">{user?.email}</Text>
        </Spacer>
      </AvatarContainer>

      <List.Section>
        <SettingsItem
          title="Favorites"
          description="View your favorites"
          onPress={() => navigation.navigate("FavoritesScreen")}
          left={() => <SettingsIcon icon="heart" color="red" />}
        />
        <SettingsItem
          title="Logout"
          onPress={onLogout}
          left={() => <SettingsIcon icon="door" />}
        />
      </List.Section>
    </SafeArea>
  );
};

export const SettingsItem = styled(List.Item)`
  padding: 16px;
  border-bottom-width: 0.33px;
  border-bottom-color: ${colors.ui.primary};
`;

export const AvatarIcon = styled(Avatar.Icon).attrs({
  color: colors.bg.primary,
  size: 180,
})`
  background-color: ${colors.brand.primary};
`;

export const AvatarContainer = styled.View`
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;
