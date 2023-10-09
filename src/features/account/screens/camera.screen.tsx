import React, { useContext, useEffect, useRef, useState } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Camera, CameraType } from "expo-camera";
import { Text } from "../../../components/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styled from "styled-components/native";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const CameraScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const isFocused = useIsFocused();
  const [uri, setUri] = useState<string | null>(null);

  const cameraRef = useRef<Camera | null>(null);

  const [type, setType] = React.useState(CameraType.front);

  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {
    console.log("isFocused", isFocused);
    if (isFocused) {
      getPermission();
    }
  }, [isFocused]);

  const getPermission = async () => {
    if (!permission?.granted) {
      await requestPermission().catch((e) => {
        console.log(e.message);
      });
    }
  };

  if (!permission?.granted) {
    return (
      <SafeArea>
        <Text>Permission not granted</Text>
      </SafeArea>
    );
  }

  const snap = async () => {
    console.log("Snap");
    if (cameraRef) {
      const photo = await cameraRef.current?.takePictureAsync();
      if (photo?.uri) {
        setUri(photo?.uri);
        await AsyncStorage.setItem(`${user?.uid}-photo`, photo?.uri);
        navigation.goBack();
      }
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: "100%",
      }}
      onPress={snap}
    >
      <ProfileCamera
        ratio="16:9"
        ref={(camera) => (cameraRef.current = camera)}
        type={type}
      ></ProfileCamera>
    </TouchableOpacity>
  );
};

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;
