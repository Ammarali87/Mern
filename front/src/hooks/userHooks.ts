import { useMutation } from '@tanstack/react-query';
import { apiClient2 } from '../ApiClient';
import { UserInfo } from '../types/UserInfo';

const API_BASE_URL = 'api/v1'; // Centralize the base URL

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) =>
      (
        await apiClient2.post<UserInfo>(`${API_BASE_URL}/auth/signin`, {
          email,
          password,
        })
      ).data,
    onError: (error) => {
      console.error('Sign-in failed:', error);
    },
  });

export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
      phone,
    }: {
      name: string;
      email: string;
      password: string;
      phone: string;
    }) =>
      (
        await apiClient2.post<UserInfo>(`${API_BASE_URL}/auth/signup`, {
          name,
          email,
          password,
          phone,
        })
      ).data,
    onError: (error) => {
      console.error('Sign-up failed:', error);
    },
  });

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) =>
      (
        await apiClient2.put<UserInfo>(`${API_BASE_URL}/users/updateMe`, {
          name,
          email,
          password,
        })
      ).data,
    onError: (error) => {
      console.error('Profile update failed:', error);
    },
  });
