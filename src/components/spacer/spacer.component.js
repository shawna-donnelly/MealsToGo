import React from "react";
import styled from "styled-components/native";

const positions = {
  top: "margin-top",
  bottom: "margin-bottom",
  left: "margin-left",
  right: "margin-right",
  horizontal: "margin-horizontal",
  vertical: "margin-vertical",
};

export const Spacer = ({ position, size, children }) => {
  return (
    <SpacerComponent position={position} size={size}>
      {children}
    </SpacerComponent>
  );
};

const SpacerComponent = styled.View`
  ${({ position, size, theme }) =>
    `${positions[position]}: ${theme.spacing[size]};`}
`;

Spacer.defaultProps = {
  position: "horizontal",
  size: "small",
};
