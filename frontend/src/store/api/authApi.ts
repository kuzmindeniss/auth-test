import { User } from 'src/types'
import { api } from '.'
import { UserLoginFormData } from 'src/features/Login';
import { UserEditFormData } from 'src/features/Edit';

interface UserWithToken {
  user: User;
  token: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserWithToken, Omit<User, 'id'>>({
      query: body => ({
        url: 'register',
        method: 'POST',
        body
      })
    }),
    login: builder.mutation<UserWithToken, UserLoginFormData>({
      query: body => ({
        url: 'login',
        method: 'POST',
        body
      })
    }),
    editUser: builder.mutation<UserWithToken, UserEditFormData>({
      query: body => ({
        url: 'edit',
        method: 'POST',
        body
      })
    }),
    auth: builder.query<{ user: User; }, void>({
      query: body => ({
        url: 'auth',
        method: 'get',
        body
      })
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation, useEditUserMutation, useAuthQuery } = authApi
