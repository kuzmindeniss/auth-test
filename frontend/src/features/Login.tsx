import { Button, TextField } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { FormLayout } from 'src/components/FormLayout';
import { handleErrors } from 'src/helpers/errors';
import { useAuth } from 'src/hooks/useAuth';

export interface UserLoginFormData {
  login: string;
  password: string;
}

export const Login: FC = () => {
  const { register, formState: { errors }, setError, handleSubmit } = useForm<UserLoginFormData>();
  const { user, login } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return (
      <Navigate to='/' />
    )
  }
  
  const submit = async (formData: UserLoginFormData) => {
    const { error } = await login(formData);

    handleErrors(error, setError);
  };

  return (
    <FormLayout
      title='Вход'
      actions={(
        <>
          <Button fullWidth onClick={handleSubmit(submit)}>Войти</Button>
          <Button fullWidth onClick={() => navigate('/registration')}>Перейти на страницу регистрации</Button>
        </>
      )}>
      <>
        <TextField
          label='Логин'
          error={Boolean(errors.login)}
          helperText={errors.login?.message}
          {...register('login', { required: true })}
        />
        <TextField
          label='Пароль'
          type='password'
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password', { required: true })}
        />
      </>
    </FormLayout>
  )
};
