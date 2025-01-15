import { useMutation } from '@tanstack/react-query'
import {apiClient2} from "../ApiClient"
import { UserInfo } from '../types/UserInfo'
 
const api = apiClient2

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) =>
      (             
        await api.post<UserInfo>(`api/v1/auth/signin`, {
          email,
          password,
        })
      ).data,
  })
  // https://ecommerce.routemisr.com/api/v1/auth/signin
export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) =>
      (
        await api.post<UserInfo>(`api/v1/auth/signup`, {
          name,
          email,
          password,
        })
      ).data,
  })

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) =>
       // this need to phone no pa
      (
        await api.put<UserInfo>(`api/v1/users/updateMe/`, {
          name,
          email,
          password,
        })
      ).data,
  })