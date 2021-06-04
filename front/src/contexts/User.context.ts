import { createContext, useState } from 'react';
import { User } from '../models/User.model';

export interface UserContext {
  isAuth: boolean;
  token?: string;
  loggedUser?: User;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user?: User) => void;
}

const userContextDefault: UserContext = {
  isAuth: false,
  login: () => {return;},
  logout: () => {return;},
  setUser: () => {return;},
};

export const UserContext = createContext<UserContext>(userContextDefault);

export function useUserContext(): UserContext {
  const [token, setToken] = useState<string | undefined>();
  const [user, changeUser] = useState<User | undefined>();

  const login = (token: string) => setToken(token);
  const logout = () => setToken(undefined);
  const setUser = (user?: User) => changeUser(user);

  return {
    isAuth: !!token,
    token: token,
    loggedUser: user,
    login,
    logout,
    setUser,
  };
}