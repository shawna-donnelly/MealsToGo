import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const loginRequest = async ({
  email,
  password,
  auth,
}: {
  email: string;
  password: string;
  auth: Auth;
}) => {
  if (!auth) {
    throw new Error("No firebase auth provided");
  }
  if (!email || !password) {
    throw new Error("Invalid credentials");
  }
  const user = await signInWithEmailAndPassword(auth, email, password);
  console.log(user);

  return user;
};

export const registerRequest = async ({
  email,
  password,
  auth,
}: {
  email: string;
  password: string;
  auth: Auth;
}) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};
