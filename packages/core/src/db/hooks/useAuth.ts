import { useMutation } from "@tanstack/react-query";
import { emailSignUp, emailLogin, logout } from "../methods/auth/auth";
import { ISignUpCredentials } from "../../types/users.types";

const useSignupEmail = () => {
  return useMutation(
    ["signup-email"],
    (data: ISignUpCredentials) => emailSignUp(data),
    {
      onSuccess: (data) => {
        // saveToken(data.uid);
        return data;
      },
    }
  );
};

const useLoginEmail = () => {
  return useMutation(
    ["login-email"],
    (data: Pick<ISignUpCredentials, "email" | "password">) => emailLogin(data),
    {
      onSuccess: (data) => {
        return data;
      },
    }
    //   onError: (data) => {
    //     console.log({ data });
    //   },
    // }
  );
};

const useLogout = () => {
  return useMutation(["logout-email"], logout);
};

export { useSignupEmail, useLoginEmail, useLogout };
