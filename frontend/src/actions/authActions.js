import {
  savePersistedAuth,
  clearPersistedAuth,
} from "../utils/authStorage";

export const login = ({ user, token }) => {
  savePersistedAuth({ user, token });
  return {
    type: "LOGIN",
    payload: { user, token },
  };
};

export const logout = () => {
  clearPersistedAuth();
  return { type: "LOGOUT" };
};
