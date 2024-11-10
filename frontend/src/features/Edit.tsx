import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form';
import { FormLayout } from 'src/components/FormLayout';
import { handleErrors } from 'src/helpers/errors';
import { useAuth } from 'src/hooks/useAuth';
import { User } from 'src/types';

export type UserEditFormData = Pick<User, 'firstName' | 'lastName'>;

export const Edit = () => {
  const { editUser, logout, user } = useAuth();
  const { register, formState: { errors }, setError, handleSubmit } = useForm<UserEditFormData>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName
    }
  });

  const submit = async (formData: UserEditFormData) => {
    const { error } = await editUser(formData);

    handleErrors(error, setError);
  };

  return (
    <FormLayout
      title={`Редактирование пользователя ${user?.login}`}
      actions={(
        <>
          <Button fullWidth onClick={handleSubmit(submit)}>Изменить данные пользователя</Button>
          <Button fullWidth onClick={logout}>Выйти</Button>
        </>
      )}>
      <>
        <TextField
          label='Имя'
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          {...register('firstName', { required: true })}
        />
        <TextField
          label='Фамилия'
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          {...register('lastName', { required: true })}
        />
      </>
    </FormLayout>
  )
};
