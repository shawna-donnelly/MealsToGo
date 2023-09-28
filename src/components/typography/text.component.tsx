import { TextProps as RNTextProps } from "react-native";
import styled from "styled-components/native";

const defaultTextStyles = (theme: any) => `
    font-family: ${theme.fonts.body};
    font-weight: ${theme.fontWeights.regular};
    color: ${theme.colors.text.primary};
    flex-wrap: wrap;
    margin-top: ${theme.spacing.none};
    margin-bottom: ${theme.spacing.none};
`;

const body = (theme: any) => `
  font-size: ${theme.fontSizes.body};
`;

const hint = (theme: any) => `
  font-size: ${theme.fontSizes.body};
`;

const error = (theme: any) => `
  color: ${theme.colors.text.error};
  text-align: center;
`;

const caption = (theme: any) => `
  font-size: ${theme.fontSizes.caption};
  font-weight: ${theme.fontWeights.bold};
`;

const label = (theme: any) => `
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.body};
  font-weight: ${theme.fontWeights.medium};
`;

const variants = {
  body,
  label,
  caption,
  error,
  hint,
};

type TextProps = RNTextProps & {
  variant?: keyof typeof variants;
};

export const Text = styled.Text<TextProps>`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant = "body", theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
