import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import { Card } from "react-native-paper";

export const SVGIcon = styled(SvgXml)`
  width: 20px;
  height: 20px;
`;

export const Icons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const RestaurantTypeImage = styled.Image`
  width: 15px;
  height: 15px;
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-vertical: ${({ theme }) => theme.spacing.xsmall};
`;
export const Section = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Info = styled.View`
  padding-vertical: ${({ theme }) => theme.spacing.small};
`;

export const RestaurantCover = styled(Card.Cover)`
  background-color: ${({ theme }) => theme.colors.bg.primary};
`;

export const RestaurantInfoCardContainer = styled(Card)`
  flex-shrink: 1;
  padding: ${({ theme }) => theme.spacing.medium};
  margin: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.bg.primary};
`;
