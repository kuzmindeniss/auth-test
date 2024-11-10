import { Button, TextField } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormLayout } from 'src/components/FormLayout';
import { handleErrors } from 'src/helpers/errors';
import { useAuth } from 'src/hooks/useAuth';
import { User } from 'src/types';

export type UserRegisterFormData = Pick<User, 'login' | 'firstName' | 'lastName'> & { password: string; };

export const Registration: FC = () => {
  const { register: registerField, formState: { errors }, setError, handleSubmit } = useForm<UserRegisterFormData>();
  const { register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const submit = async (formData: UserRegisterFormData) => {
    const { error } = await registerUser(formData);

    handleErrors(error, setError);
  };

  if (isAuthenticated) {
    navigate('/');
  }

  return (
    <FormLayout
      title='Регистрация'
      actions={<Button fullWidth onClick={handleSubmit(submit)}>Зарегистрироваться</Button>}>
      <>
        <TextField
          label='Логин'
          error={Boolean(errors.login)}
          helperText={errors.login?.message}
          {...registerField('login', { required: true })}
        />
        <TextField
          label='Пароль'
          type='password'
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...registerField('password', { required: true })}
        />
        <TextField
          label='Имя'
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          {...registerField('firstName', { required: true })}
        />
        <TextField
          label='Фамилия'
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          {...registerField('lastName', { required: true })}
        />
      </>
    </FormLayout>
  );
};
