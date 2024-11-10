import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';
import { ResponseWithErrors } from 'src/types';

export const handleErrors = <T extends FieldValues>(
  error: FetchBaseQueryError | SerializedError | undefined,
  setError: UseFormSetError<T>
) => {
  if (!error || !(error as FetchBaseQueryError)?.data) {
    return;
  }

  const errorsData = (error as FetchBaseQueryError)['data'] as ResponseWithErrors;

  errorsData?.errors?.forEach(error => setError(error.path as FieldPath<T>, { message: error.msg }));
};
