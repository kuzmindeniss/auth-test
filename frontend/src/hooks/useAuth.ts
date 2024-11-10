import Cookies from 'js-cookie';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useEditUserMutation, useLoginMutation, useRegisterMutation } from 'src/store/api/authApi';
import { logout } from 'src/store/auth/authSlice';
import { useAppSelector } from 'src/store/hooks';

export const useAuth = () => {
  const authInfo = useAppSelector(state => state.auth);
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [editUser] = useEditUserMutation();
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    Cookies.remove('accessToken');
  }, []);

  return {
    ...authInfo,
    logout: handleLogout,
    login,
    register,
    editUser
  };
};
