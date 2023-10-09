/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, ReactNode } from "react";

import { initializeApp, FirebaseApp } from "firebase/app";

import {
  initializeAuth,
  getReactNativePersistence,
  User,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { loginRequest, registerRequest } from "./authentication.service";
import { firebaseConfig } from "../../config";

export const AuthenticationContext = createContext<{
  isAuthenticated: boolean;
  user: User | null | undefined;
  isLoading: boolean;
  error: null | string | undefined;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (
    email: string,
    password: string,
    repeatedPassword: string
  ) => Promise<void>;
  onLogout: () => Promise<void>;
}>({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  onLogin: () => Promise.resolve(),
  onRegister: () => Promise.resolve(),
  onLogout: () => Promise.resolve(),
});

export const AuthenticationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null | undefined>(null);
  const [error, setError] = useState<null | string | undefined>(null);

  // Initialize Firebase

  useEffect(() => {
    const FIREBASE_APP = !app ? initializeApp(firebaseConfig) : app;
    const FIREBASE_AUTH = !auth
      ? initializeAuth(FIREBASE_APP, {
          persistence: getReactNativePersistence(ReactNativeAsyncStorage),
        })
      : auth;
    setApp(FIREBASE_APP);
    setAuth(FIREBASE_AUTH);
  }, []);

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (usr) => {
        console.log({ usr });
        if (usr) {
          setUser(usr);
          setIsLoading(false);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      });
    }
  }, [auth]);

  const onLogin = async (email: string, password: string) => {
    setIsLoading(true);
    console.log("Inside onLogin", email, password);
    if (app && auth) {
      const usr = await loginRequest({
        email,
        password,
        auth: auth,
      }).catch((e) => {
        console.log({ e });
        setIsLoading(false);
        setError(e.message.replace("Firebase: ", ""));
      });

      console.log({ usr });
      if (usr) {
        setUser(usr.user);
      }
      setIsLoading(false);
    }
  };

  const onRegister = async (
    email: string,
    password: string,
    repeatedPassword: string
  ) => {
    setIsLoading(true);
    setError(null);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      setIsLoading(false);
      return;
    }
    if (app && auth) {
      console.log("Inside onRegister", email, password);

      const usr = await registerRequest({
        email,
        password,
        auth,
      }).catch((e) => {
        console.log({ e });
        setIsLoading(false);
        setError(e.message.replace("Firebase: ", ""));
      });

      console.log({ usr });

      if (usr) {
        setUser(usr);
      }

      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    setUser(null);
    await auth?.signOut();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onRegister,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
