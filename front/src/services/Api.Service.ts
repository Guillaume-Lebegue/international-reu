import axios, { AxiosResponse } from 'axios';

import { User } from '../models/User.model';

const apiUrl = process.env.REACT_APP_API || '';

export const login = (password: string): Promise<AxiosResponse<string>> => {
  return axios.post<string>(`${apiUrl}auth/login`, { password });
};

export const getAllUsers = (token: string): Promise<AxiosResponse<{ users: User[] }>> => {
  return axios.get<{ users: User[] }>(`${apiUrl}user/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const createUser = (token: string, newUser: User): Promise<AxiosResponse<User>> => {
  return axios.post<User>(`${apiUrl}user/`, newUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const deleteUser = (token: string, userId: string): Promise<AxiosResponse<void>> => {
  return axios.delete(`${apiUrl}user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const updateOffset = (token: string, userId: string, newOffset: number): Promise<AxiosResponse<User>> => {
  return axios.post<User>(`${apiUrl}user/${userId}/offset`, {
    offset: newOffset
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};
