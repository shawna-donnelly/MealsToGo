import React, { FC, useEffect, useRef } from "react";
import { Animated } from "react-native";

interface FadeInViewProps {
  duration?: number;
  style?: any;
  children?: React.ReactNode;
}

export const FadeInView: FC<FadeInViewProps> = ({
  duration = 1500,
  ...props
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View style={{ ...props.style, opacity: fadeAnim }}>
      {props.children}
    </Animated.View>
  );
};
